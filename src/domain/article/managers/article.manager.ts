import { Injectable } from '@nestjs/common';
import { ArticleTypeEnum } from '@domain/article/types/article-type.enum';
import { ArticleEntity } from '@domain/article/entities/article.entity';

@Injectable()
export class ArticleManager {
  createEntity(dto: { title: string; summary: string; type: ArticleTypeEnum }) {
    const article = new ArticleEntity();
    article.title = dto.title;
    article.summary = dto.summary;
    article.type = dto.type;

    return article;
  }

  updateEntity(dto: {
    oldEntity: ArticleEntity;
    title: string;
    summary: string;
    type: ArticleTypeEnum;
  }) {
    const article = dto.oldEntity;
    article.title = dto.title;
    article.summary = dto.summary;
    article.type = dto.type;

    return article;
  }
}
