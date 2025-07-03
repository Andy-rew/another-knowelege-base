import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { UserAuthTokensEntity } from '@domain/user/user-auth-tokens.entity';

@Entity()
export class UserEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'text' })
  password: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => UserAuthTokensEntity, (authToken) => authToken.user)
  authTokens: UserAuthTokensEntity[];
}
