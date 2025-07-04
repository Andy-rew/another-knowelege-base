import { ApiProperty } from '@nestjs/swagger';
import { TagEntity } from '@domain/tag/entities/tag.entity';
import { ArticleEntity } from '@domain/article/entities/article.entity';

class GetAllArticlesArticleTagItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  constructor(tag: TagEntity) {
    this.id = tag.id;
    this.title = tag.title;
  }
}

class GetAllArticlesArticleItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  summary: string;

  @ApiProperty({ type: GetAllArticlesArticleTagItem, isArray: true })
  tags: GetAllArticlesArticleTagItem[];

  constructor(article: ArticleEntity) {
    this.id = article.id;
    this.title = article.title;
    this.summary = article.summary;
    this.tags = article.tags.map(
      (tag) => new GetAllArticlesArticleTagItem(tag),
    );
  }
}

export class GetAllArticlesResponse {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: GetAllArticlesArticleItem, isArray: true })
  articles: GetAllArticlesArticleItem[];

  constructor(articles: ArticleEntity[], count: number) {
    this.count = count;
    this.articles = articles.map(
      (article) => new GetAllArticlesArticleItem(article),
    );
  }
}
