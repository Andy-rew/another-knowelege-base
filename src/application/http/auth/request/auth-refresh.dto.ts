import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class AuthRefreshDto {
  @ApiProperty({ description: 'refresh JWT токен' })
  @IsJWT()
  refreshToken: string;
}
