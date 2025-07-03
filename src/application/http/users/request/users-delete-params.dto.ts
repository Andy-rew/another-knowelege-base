import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UsersDeleteParamsDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
