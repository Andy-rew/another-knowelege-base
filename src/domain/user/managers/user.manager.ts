import { Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { EditUserDtoType } from '@domain/user/types/edit-user-dto.type';

@Injectable()
export class UserManager {
  createEntity(dto: {
    email: string;
    hashedPassword: string;
    name: string;
  }): UserEntity {
    const user = new UserEntity();

    user.email = dto.email;
    user.name = dto.name;
    user.password = dto.hashedPassword;

    return user;
  }

  createUpdatedEntity(dto: {
    oldUser: UserEntity;
    newParams: EditUserDtoType;
  }) {
    const user = dto.oldUser;
    user.email = dto.newParams.email;
    user.name = dto.newParams.name;

    return user;
  }
}
