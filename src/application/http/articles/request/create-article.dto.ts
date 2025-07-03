import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ArticleTypeEnum } from '@domain/article/types/article-type.enum';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  summary: string;

  @ApiProperty({ enum: ArticleTypeEnum })
  @IsEnum(ArticleTypeEnum)
  type: ArticleTypeEnum;
}
