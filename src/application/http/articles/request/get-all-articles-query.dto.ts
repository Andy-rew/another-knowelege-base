import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ArticleTypeEnum } from '@domain/article/types/article-type.enum';

export class GetAllArticlesQueryDto {
  @ApiPropertyOptional({ isArray: true, minItems: 1 })
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  tagIds?: number[];

  @ApiPropertyOptional()
  @IsEnum(ArticleTypeEnum)
  @IsOptional()
  type?: ArticleTypeEnum;

  @ApiProperty()
  @IsNumber()
  limit: number;

  @ApiProperty()
  @IsNumber()
  offset: number;
}
