import { BadRequestException, Injectable } from '@nestjs/common';
import { TagEntity } from '@domain/tag/entities/tag.entity';
import { TagRepository } from '@domain/tag/repositories/tag.repository';
import { ArticleRepository } from '@domain/article/repositories/article.repository';

@Injectable()
export class TagService {
  constructor(
    public readonly tagsRepository: TagRepository,
    private readonly articleRepository: ArticleRepository,
  ) {}

  async create(dto: { title: string }): Promise<TagEntity> {
    const newTag = new TagEntity();
    newTag.title = dto.title;
    return this.tagsRepository.save(newTag);
  }

  async delete(tag: TagEntity): Promise<void> {
    const existingArticle = await this.articleRepository.findArticleByTag(tag);

    if (existingArticle) {
      throw new BadRequestException(
        'You should drop all articles linked to tag',
      );
    }

    await this.tagsRepository.delete(tag);
  }
}
