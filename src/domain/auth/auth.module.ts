import { forwardRef, Module } from '@nestjs/common';
import { AuthManager } from '@domain/auth/managers/auth.manager';
import { AuthService } from '@domain/auth/services/auth.service';
import { AuthJwtTokenService } from '@domain/auth/services/auth-jwt-token.service';
import { AuthValidator } from '@domain/auth/validators/auth.validator';
import { UserModule } from '@domain/user/user.module';
import { AuthUtilsService } from '@domain/auth/services/auth-utils.service';
import { AuthJwtRefreshTokenModule } from '@infrastructure/module/auth-jwt-refresh-token.module';
import { AuthJwtAccessTokenModule } from '@infrastructure/module/auth-jwt-access-token.module';
import { AuthController } from '@applications/http/auth/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    AuthJwtRefreshTokenModule,
    AuthJwtAccessTokenModule,
  ],
  providers: [
    AuthManager,
    AuthService,
    AuthJwtTokenService,
    AuthValidator,
    AuthUtilsService,
  ],
  exports: [AuthUtilsService, AuthJwtTokenService],
})
export class AuthModule {}
