import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@domain/auth/services/auth.service';
import { AuthSignInDto } from '@applications/http/auth/request/auth-sign-in.dto';
import { AuthSignInResponse } from '@applications/http/auth/response/auth-sign-in.response';
import { AuthSignUpDto } from '@applications/http/auth/request/auth-sign-up.dto';
import { AuthSignUpResponse } from '@applications/http/auth/response/auth-sign-up.response';
import { UserAuthTokensEntity } from '@domain/user/entities/user-auth-tokens.entity';
import { AuthRefreshDto } from '@applications/http/auth/request/auth-refresh.dto';
import { UserEntity } from '@domain/user/entities/user.entity';
import { AuthRefreshResponse } from '@applications/http/auth/response/auth-refresh.response';
import { AuthGuard } from '@applications/guards/auth.guard';
import { ReqToken } from '@applications/decorators/req-token.decorator';
import { ReqUser } from '@applications/decorators/req-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() body: AuthSignInDto) {
    const res = await this.authService.signIn({
      email: body.email,
      password: body.password,
    });
    return new AuthSignInResponse(res);
  }

  @Post('/sign-up')
  async signUp(@Body() body: AuthSignUpDto) {
    const res = await this.authService.signUpByEmailAndPassword({
      email: body.email,
      samePassword: body.samePassword,
      password: body.password,
    });
    return new AuthSignUpResponse(res);
  }

  @UseGuards(AuthGuard)
  @Post('/sign-out')
  async signOut(@ReqToken() token: UserAuthTokensEntity) {
    await this.authService.signOut({
      accessToken: token.accessToken,
      userId: token.user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/refresh')
  async refresh(@Body() body: AuthRefreshDto, @ReqUser() user: UserEntity) {
    const res = await this.authService.refreshTokens({
      refreshToken: body.refreshToken,
      currentUser: user,
    });
    return new AuthRefreshResponse(res);
  }
}
