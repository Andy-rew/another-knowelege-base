import { ApiProperty } from '@nestjs/swagger';
import { ArticleEntity } from '@domain/article/entities/article.entity';

export class CreateArticleResponse {
  @ApiProperty()
  id: number;

  constructor(article: ArticleEntity) {
    this.id = article.id;
  }
}
