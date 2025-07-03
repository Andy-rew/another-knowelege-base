import { Module } from '@nestjs/common';
import { TagService } from '@domain/tag/services/tag.service';
import { TagRepository } from '@domain/tag/repositories/tag.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '@domain/tag/entities/tag.entity';
import { ArticleModule } from '@domain/article/article.module';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([TagEntity]), ArticleModule],
  providers: [TagService, TagRepository],
  exports: [TagService],
})
export class TagModule {}
