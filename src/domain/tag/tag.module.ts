import { Module } from '@nestjs/common';
import { TagService } from '@domain/tag/services/tag.service';
import { TagRepository } from '@domain/tag/repositories/tag.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '@domain/tag/entities/tag.entity';
import { ArticleModule } from '@domain/article/article.module';
import { TagsController } from '@applications/http/tags/tags.controller';
import { AuthJwtAccessTokenModule } from '@infrastructure/module/auth-jwt-access-token.module';
import { UserModule } from '@domain/user/user.module';

@Module({
  controllers: [TagsController],
  imports: [
    TypeOrmModule.forFeature([TagEntity]),
    ArticleModule,
    AuthJwtAccessTokenModule,
    UserModule,
  ],
  providers: [TagService, TagRepository],
  exports: [TagService, TagRepository],
})
export class TagModule {}
