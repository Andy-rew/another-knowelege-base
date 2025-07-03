import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '@domain/article/repositories/article.repository';
import { ArticleManager } from '@domain/article/managers/article.manager';
import { ArticleEntity } from '@domain/article/entities/article.entity';
import { ArticleTypeEnum } from '@domain/article/types/article-type.enum';
import { TagEntity } from '@domain/tag/entities/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    private articleRepository: ArticleRepository,
    private articleManager: ArticleManager,
  ) {}

  async create(dto: {
    title: string;
    summary: string;
    type: ArticleTypeEnum;
  }): Promise<ArticleEntity> {
    const article = this.articleManager.createEntity({
      title: dto.title,
      summary: dto.summary,
      type: dto.type,
    });
    return this.articleRepository.save(article);
  }

  async edit(dto: {
    article: ArticleEntity;
    title: string;
    summary: string;
    type: ArticleTypeEnum;
  }): Promise<ArticleEntity> {
    const article = this.articleManager.updateEntity({
      oldEntity: dto.article,
      title: dto.title,
      summary: dto.summary,
      type: dto.type,
    });
    return this.articleRepository.save(article);
  }

  async editTags(dto: {
    article: ArticleEntity;
    tags: TagEntity[];
  }): Promise<ArticleEntity> {
    const article = dto.article;
    article.tags = dto.tags;
    return this.articleRepository.save(article);
  }

  async deleteArticle(article: ArticleEntity): Promise<void> {
    await this.articleRepository.delete(article);
  }
}
