import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from '@domain/tag/entities/tag.entity';

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly repo: Repository<TagEntity>,
  ) {}

  async save(tag: TagEntity): Promise<TagEntity> {
    return this.repo.save(tag);
  }

  async delete(tag: TagEntity): Promise<void> {
    await this.repo.delete(tag.id);
  }
}
