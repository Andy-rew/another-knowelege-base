import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '@domain/article/entities/article.entity';
import { TagEntity } from '@domain/tag/entities/tag.entity';
import { ArticleTypeEnum } from '@domain/article/types/article-type.enum';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repo: Repository<ArticleEntity>,
  ) {}

  async save(article: ArticleEntity): Promise<ArticleEntity> {
    return this.repo.save(article);
  }

  async delete(article: ArticleEntity): Promise<void> {
    await this.repo.delete(article.id);
  }

  async findArticleByTag(tag: TagEntity): Promise<ArticleEntity> {
    return this.repo
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.tags', 'tags')
      .where('tags.id = :tag_id', { tag_id: tag.id })
      .getOne();
  }

  async findOne(id: number): Promise<ArticleEntity> {
    return this.repo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.tags', 'tags')
      .where('article.id = :article_id', { article_id: id })
      .getOne();
  }

  async findOneOrFail(id: number): Promise<ArticleEntity> {
    const articleForRes = await this.findOne(id);
    if (!articleForRes) {
      throw new NotFoundException('Article not found');
    }
    return articleForRes;
  }

  async findAllWithFilters(dto: {
    limit: number;
    offset: number;
    tagIds?: number[];
    type?: ArticleTypeEnum;
  }): Promise<[ArticleEntity[], number]> {
    const query = this.repo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.tags', 'tags');

    if (dto.type) {
      query.andWhere('article.type = :type', { type: dto.type });
    }

    if (dto.tagIds && dto.tagIds.length > 0) {
      query.andWhere('tags.id IN (:...tag_ids)', { tag_ids: dto.tagIds });
    }

    return query.limit(dto.limit).offset(dto.offset).getManyAndCount();
  }
}
