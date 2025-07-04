import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UsersCreateDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Пароль', minLength: 6, maxLength: 50 })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Пароль повтор', minLength: 6, maxLength: 50 })
  @IsString()
  samePassword: string;
}
