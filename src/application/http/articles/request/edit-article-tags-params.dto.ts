import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class EditArticleTagsParamsDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
