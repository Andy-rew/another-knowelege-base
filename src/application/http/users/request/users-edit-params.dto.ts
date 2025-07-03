import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UsersEditParamsDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
