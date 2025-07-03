import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class GetAllArticlesNonAuthQueryDto {
  @ApiPropertyOptional({ isArray: true, minItems: 1 })
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  tagIds?: number[];

  @ApiProperty()
  @IsNumber()
  limit: number;

  @ApiProperty()
  @IsNumber()
  offset: number;
}
