import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@domain/user/entities/user.entity';

class UserAllUserItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}

export class UsersAllResponse {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: UserAllUserItem, isArray: true })
  users: UserAllUserItem[];

  constructor(users: UserEntity[], count: number) {
    this.count = count;
    this.users = users.map((user) => new UserAllUserItem(user));
  }
}
