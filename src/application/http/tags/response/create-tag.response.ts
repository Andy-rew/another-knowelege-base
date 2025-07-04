import { TagEntity } from '@domain/tag/entities/tag.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagResponse {
  @ApiProperty()
  id: number;

  constructor(tag: TagEntity) {
    this.id = tag.id;
  }
}
