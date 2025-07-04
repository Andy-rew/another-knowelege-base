import { UserEntity } from '@domain/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AuthSignUpResponse {
  @ApiProperty()
  id: number;

  constructor(user: UserEntity) {
    this.id = user.id;
  }
}
