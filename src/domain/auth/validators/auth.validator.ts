import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { CommonAuthPayload } from '@domain/auth/types/common-auth-payload';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { Application, CONFIGS } from '@infrastructure/types/configuration';

@Injectable()
export class AuthValidator {
  private applicationConfig: Application;

  constructor(
    @Inject('AuthJwtAccessTokenService')
    private readonly accessJwtService: JwtService,
    @Inject('AuthJwtRefreshTokenService')
    private readonly refreshJwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.applicationConfig = this.configService.get<Application>(
      CONFIGS.application,
    );
  }

  validateUserSignIn(user: UserEntity) {
    if (user.deletedAt !== null) {
      throw new BadRequestException('User is deleted. Please sign up first');
    }
  }

  validateUserActivationCodeSignUp(dto: {
    password: string;
    samePassword: string;
  }) {
    if (dto.password !== dto.samePassword) {
      throw new BadRequestException('Passwords do not match');
    }

    if (dto.password.length < this.applicationConfig.passwordLength) {
      throw new BadRequestException(
        `Password must be at least ${this.applicationConfig.passwordLength} characters long`,
      );
    }
  }

  async validateAndVerifyAccessToken(
    token: string,
  ): Promise<CommonAuthPayload> {
    try {
      return this.accessJwtService.verify(token);
    } catch (error) {
      throw new BadRequestException('Invalid access token');
    }
  }

  async validateAndVerifyRefreshToken(
    token: string,
  ): Promise<CommonAuthPayload> {
    try {
      return this.refreshJwtService.verify(token);
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
