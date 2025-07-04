import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthSignInDto {
  @ApiProperty({ description: 'Почта' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль', minLength: 6, maxLength: 50 })
  @IsString()
  password: string;
}
