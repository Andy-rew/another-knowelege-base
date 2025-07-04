import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '@domain/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomInt } from 'node:crypto';

export class UserBuilder {
  constructor(private readonly app: INestApplication) {}

  private name = 'Иван';
  private email = `test${new Date().getTime()}${randomInt(100000)}@mail.ru`;
  private password = '12345678';

  withName(name: string) {
    this.name = name;
  }

  withEmail(email: string) {
    this.email = email;
  }
  withPassword(password: string) {
    this.password = password;
  }

  private buildEntity(): UserEntity {
    const user = new UserEntity();
    user.name = this.name;
    user.email = this.email;
    user.password = this.password;
    return user;
  }

  async build(): Promise<UserEntity> {
    const user = this.buildEntity();
    return this.app
      .get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
      .save(user);
  }
}
