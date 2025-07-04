import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/user/repository/user.repository';
import { UserEntity } from '@domain/user/entities/user.entity';
import { UserManager } from '@domain/user/managers/user.manager';
import { AuthUtilsService } from '@domain/auth/services/auth-utils.service';
import { EditUserDtoType } from '@domain/user/types/edit-user-dto.type';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userManager: UserManager,
    private readonly passwordUtilsService: AuthUtilsService,
  ) {}

  public async createUser(dto: {
    name: string;
    email: string;
    password: string;
    samePassword: string;
  }): Promise<UserEntity> {
    if (dto.password !== dto.samePassword) {
      throw new BadRequestException('Passwords dont match');
    }

    const hashedPassword = await this.passwordUtilsService.hashPassword(
      dto.password,
    );

    const user = this.userManager.createEntity({
      email: dto.email,
      name: dto.name,
      hashedPassword,
    });

    return this.userRepository.save(user);
  }

  public async editUser(dto: {
    user: UserEntity;
    newParams: EditUserDtoType;
  }): Promise<UserEntity> {
    const newUser = this.userManager.createUpdatedEntity({
      oldUser: dto.user,
      newParams: dto.newParams,
    });

    return this.userRepository.save(newUser);
  }

  public async deleteUser(user: UserEntity): Promise<void> {
    await this.userRepository.deleteUserWithTokensTransaction(user);
  }
}
