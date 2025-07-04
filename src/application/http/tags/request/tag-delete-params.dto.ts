import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class TagDeleteParamsDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
