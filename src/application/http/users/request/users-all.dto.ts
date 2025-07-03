import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UsersAllDto {
  @ApiProperty()
  @IsNumber()
  limit: number;

  @ApiProperty()
  @IsNumber()
  offset: number;
}
