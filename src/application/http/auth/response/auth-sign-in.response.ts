import { UserAuthTokensEntity } from '@domain/user/entities/user-auth-tokens.entity';
import { UserEntity } from '@domain/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

class AuthSignInUserItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}

export class AuthSignInResponse {
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

  @ApiProperty({ description: 'Пользователь' })
  user: AuthSignInUserItem;

  constructor(userAuthToken: UserAuthTokensEntity) {
    this.accessToken = userAuthToken.accessToken;
    this.refreshToken = userAuthToken.refreshToken;
    this.accessTokenExpiredAt = userAuthToken.accessTokenExpiredAt;
    this.refreshTokenExpiredAt = userAuthToken.refreshTokenExpiredAt;
    this.user = new AuthSignInUserItem(userAuthToken.user);
  }
}
