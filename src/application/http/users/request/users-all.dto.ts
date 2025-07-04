import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UsersAllDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  limit: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  offset: number;
}
