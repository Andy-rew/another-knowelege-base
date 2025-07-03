import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EditArticleParamsDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
