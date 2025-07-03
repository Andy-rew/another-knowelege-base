import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { UserAuthTokensEntity } from '@domain/user/entities/user-auth-tokens.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
