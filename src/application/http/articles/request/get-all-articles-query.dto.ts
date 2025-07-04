import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ArticleTypeEnum } from '@domain/article/types/article-type.enum';
import { Transform, Type } from 'class-transformer';

export class GetAllArticlesQueryDto {
  @ApiPropertyOptional({ isArray: true, minItems: 1 })
  @IsArray()
  @IsOptional()
  @Transform(({ value }: { value: string | string[] }) => {
    if (Array.isArray(value)) {
      return value;
    }
    return value.split(',').map(Number);
  })
  tagIds?: number[];

  @ApiPropertyOptional()
  @IsEnum(ArticleTypeEnum)
  @IsOptional()
  type?: ArticleTypeEnum;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  limit: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  offset: number;
}
