import { ApiProperty } from '@nestjs/swagger';
import { TagEntity } from '@domain/tag/entities/tag.entity';
import { ArticleEntity } from '@domain/article/entities/article.entity';

class GetAllArticlesNonAuthArticleTagItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  constructor(tag: TagEntity) {
    this.id = tag.id;
    this.title = tag.title;
  }
}

class GetAllArticlesNonAuthItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  summary: string;

  @ApiProperty({ type: GetAllArticlesNonAuthArticleTagItem, isArray: true })
  tags: GetAllArticlesNonAuthArticleTagItem[];

  constructor(article: ArticleEntity) {
    this.id = article.id;
    this.title = article.title;
    this.summary = article.summary;
    this.tags = article.tags.map(
      (tag) => new GetAllArticlesNonAuthArticleTagItem(tag),
    );
  }
}

export class GetAllArticlesNonAuthResponse {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: GetAllArticlesNonAuthItem, isArray: true })
  articles: GetAllArticlesNonAuthItem[];

  constructor(articles: ArticleEntity[], count: number) {
    this.count = count;
    this.articles = articles.map(
      (article) => new GetAllArticlesNonAuthItem(article),
    );
  }
}
