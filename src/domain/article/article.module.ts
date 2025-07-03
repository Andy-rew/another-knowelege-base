import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from '@domain/article/services/article.service';
import { ArticleRepository } from '@domain/article/repositories/article.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@domain/article/entities/article.entity';
import { ArticleManager } from '@domain/article/managers/article.manager';
import { ArticlesController } from '@applications/http/articles/articles.controller';
import { AuthJwtAccessTokenModule } from '@infrastructure/module/auth-jwt-access-token.module';
import { UserModule } from '@domain/user/user.module';
import { TagModule } from '@domain/tag/tag.module';

@Module({
  controllers: [ArticlesController],
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    AuthJwtAccessTokenModule,
    UserModule,
    forwardRef(() => TagModule),
  ],
  providers: [ArticleService, ArticleRepository, ArticleManager],
  exports: [ArticleRepository],
})
export class ArticleModule {}
