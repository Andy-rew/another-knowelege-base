import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@domain/user/entities/user.entity';
import { UserRepository } from '@domain/user/repository/user.repository';
import { UserAuthTokensEntity } from '@domain/user/entities/user-auth-tokens.entity';
import { UserAuthTokensRepository } from '@domain/user/repository/user-auth-tokens.repository';
import { UserService } from '@domain/user/services/user.service';
import { UserManager } from '@domain/user/managers/user.manager';
import { AuthModule } from '@domain/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserAuthTokensEntity]),
    AuthModule,
  ],
  providers: [
    UserRepository,
    UserAuthTokensRepository,
    UserService,
    UserManager,
  ],
  exports: [UserRepository, UserAuthTokensRepository, UserService, UserManager],
})
export class UserModule {}
