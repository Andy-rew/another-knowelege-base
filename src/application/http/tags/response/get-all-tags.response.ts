import { ApiProperty } from '@nestjs/swagger';
import { TagEntity } from '@domain/tag/entities/tag.entity';

class GetAllTagsTagItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  constructor(tag: TagEntity) {
    this.id = tag.id;
    this.title = tag.title;
  }
}

export class GetAllTagsResponse {
  @ApiProperty({ type: GetAllTagsTagItem, isArray: true })
  tags: GetAllTagsTagItem[];

  @ApiProperty()
  count: number;

  constructor(tags: TagEntity[], count: number) {
    this.count = count;
    this.tags = tags.map((tag) => new GetAllTagsTagItem(tag));
  }
}
