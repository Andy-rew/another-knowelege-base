import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EditArticleTagsParamsDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
