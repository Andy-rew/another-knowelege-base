import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIGS, JwtRefreshConfig } from '@infrastructure/types/configuration';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const jwtConfig = configService.get<JwtRefreshConfig>(
          CONFIGS.jwtRefresh,
        );
        const options: JwtModuleOptions = {
          secret: jwtConfig.refreshSecret,
          signOptions: {
            expiresIn: Number(jwtConfig.refreshExpireTimeMinutes) * 60,
          },
        };
        return options;
      },
    }),
  ],
  providers: [
    {
      provide: 'AuthJwtRefreshTokenService',
      useExisting: JwtService,
    },
  ],
  exports: ['AuthJwtRefreshTokenService'],
})
export class AuthJwtRefreshTokenModule {}
