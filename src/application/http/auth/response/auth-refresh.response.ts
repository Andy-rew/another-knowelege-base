import { ApiProperty } from '@nestjs/swagger';
import { UserAuthTokensEntity } from '@domain/user/entities/user-auth-tokens.entity';

export class AuthRefreshResponse {
  @ApiProperty({ description: 'access JWT токен' })
  accessToken: string;

  @ApiProperty({ description: 'refresh JWT токен' })
  refreshToken: string;

  @ApiProperty({
    description: 'Дата и время истечения access JWT токена',
  })
  accessTokenExpiredAt: Date;

  @ApiProperty({
    description: 'Дата и время истечения refresh JWT токена',
  })
  refreshTokenExpiredAt: Date;

  constructor(authToken: UserAuthTokensEntity) {
    this.accessToken = authToken.accessToken;
    this.refreshToken = authToken.refreshToken;
    this.accessTokenExpiredAt = authToken.accessTokenExpiredAt;
    this.refreshTokenExpiredAt = authToken.refreshTokenExpiredAt;
  }
}
