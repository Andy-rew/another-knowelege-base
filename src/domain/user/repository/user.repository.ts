import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthTokensEntity } from '@domain/user/entities/user-auth-tokens.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async save(dto: UserEntity): Promise<UserEntity> {
    return await this.repo.save(dto);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .withDeleted()
      .getOne();
  }

  async findByEmailOrFail(email: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.repo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async findByIdOrFail(id: number): Promise<UserEntity> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async deleteUserWithTokensTransaction(user: UserEntity): Promise<void> {
    const qr = this.repo.manager.connection.createQueryRunner();
    await qr.startTransaction();
    try {
      await this.repo
        .createQueryBuilder('tokens')
        .delete()
        .from(UserAuthTokensEntity)
        .where('user_id = :user_id', { user_id: user.id })
        .execute();

      await this.repo.delete(user.id);
      await qr.commitTransaction();
    } catch (error) {
      await qr.rollbackTransaction();
      throw new Error(error);
    } finally {
      await qr.release();
    }
  }

  async findAllPaginated(dto: {
    limit: number;
    offset: number;
  }): Promise<[UserEntity[], number]> {
    return this.repo
      .createQueryBuilder('users')
      .limit(dto.limit)
      .offset(dto.offset)
      .getManyAndCount();
  }
}
