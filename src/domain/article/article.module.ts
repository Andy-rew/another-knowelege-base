import { Module } from '@nestjs/common';
import { ArticleService } from '@domain/article/services/article.service';
import { ArticleRepository } from '@domain/article/repositories/article.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@domain/article/entities/article.entity';
import { ArticleManager } from '@domain/article/managers/article.manager';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  providers: [ArticleService, ArticleRepository, ArticleManager],
  exports: [ArticleRepository],
})
export class ArticleModule {}
