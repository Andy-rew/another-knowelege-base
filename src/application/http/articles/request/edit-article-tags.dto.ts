import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class EditArticleTagsDto {
  @ApiProperty({ isArray: true, minItems: 1 })
  @IsNumber({}, { each: true })
  @IsArray()
  tagIds: number[];
}
