import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GetAllArticlesNonAuthQueryDto {
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

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  limit: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  offset: number;
}
