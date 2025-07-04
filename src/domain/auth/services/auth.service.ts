import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { UserAuthTokensEntity } from '@domain/user/entities/user-auth-tokens.entity';
import { AuthJwtTokenService } from '@domain/auth/services/auth-jwt-token.service';
import { UserRepository } from '@domain/user/repository/user.repository';
import { AuthValidator } from '@domain/auth/validators/auth.validator';
import { AuthManager } from '@domain/auth/managers/auth.manager';
import { AuthUtilsService } from '@domain/auth/services/auth-utils.service';
import { CommonAuthPayload } from '@domain/auth/types/common-auth-payload';
import { UserAuthTokensRepository } from '@domain/user/repository/user-auth-tokens.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authJwtTokenService: AuthJwtTokenService,
    private readonly userRepository: UserRepository,
    private readonly authValidator: AuthValidator,
    private readonly userAuthTokensRepository: UserAuthTokensRepository,
    private readonly authManager: AuthManager,
    private readonly passwordUtilsService: AuthUtilsService,
  ) {}

  async signIn(dto: {
    email: string;
    password: string;
  }): Promise<UserAuthTokensEntity> {
    const user: UserEntity = await this.userRepository.findByEmailOrFail(
      dto.email,
    );

    this.authValidator.validateUserSignIn(user);

    await this.passwordUtilsService.checkPasswordHashOrFail({
      enteredPassword: dto.password,
      hashedPassword: user.password,
    });

    const newAuthTokenEntity: UserAuthTokensEntity =
      await this.authJwtTokenService.generateNewTokensWithExpirationDates(user);

    return this.userAuthTokensRepository.save(newAuthTokenEntity);
  }

  async signUpByEmailAndPassword(dto: {
    email: string;
    name: string;
    password: string;
    samePassword: string;
  }): Promise<UserEntity> {
    const existUser: UserEntity = await this.userRepository.findByEmail(
      dto.email,
    );

    const user = existUser ?? new UserEntity();

    this.authValidator.validateUserActivationCodeSignUp({
      password: dto.password,
      samePassword: dto.samePassword,
    });

    const hashedPassword = await this.passwordUtilsService.hashPassword(
      dto.password,
    );

    const userPasswordEntity = this.authManager.createUserSignUpEntity({
      user: user,
      name: dto.name,
      email: dto.email,
      hashedPassword: hashedPassword,
    });

    return this.userRepository.save(userPasswordEntity);
  }

  async refreshTokens(dto: {
    refreshToken: string;
    currentUser: UserEntity;
  }): Promise<UserAuthTokensEntity> {
    const payload: CommonAuthPayload =
      await this.authValidator.validateAndVerifyRefreshToken(dto.refreshToken);

    if (payload.id !== dto.currentUser.id) {
      throw new BadRequestException(
        'You are bad man. Use your own refresh token',
      );
    }

    const userToken: UserAuthTokensEntity =
      await this.userAuthTokensRepository.findByRefreshTokenAndUserIdOrFail({
        refreshToken: dto.refreshToken,
        userId: payload.id,
      });

    const newAuthTokenEntity: UserAuthTokensEntity =
      await this.authJwtTokenService.generateNewTokensWithExpirationDates(
        userToken.user,
      );

    const refreshedTokens = this.authManager.refreshTokens({
      oldTokens: userToken,
      newTokens: newAuthTokenEntity,
    });

    return this.userAuthTokensRepository.save(refreshedTokens);
  }

  async signOut(dto: { accessToken: string; userId: number }): Promise<void> {
    await this.userAuthTokensRepository.deleteByAccessTokenAndUserId({
      accessToken: dto.accessToken,
      userId: dto.userId,
    });
  }
}
