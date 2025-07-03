import { Controller } from '@nestjs/common';
import { ArticleService } from '@domain/article/services/article.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) {}
}
