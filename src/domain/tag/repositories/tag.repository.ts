import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  async findManyByIds(ids: number[]): Promise<TagEntity[]> {
    return this.repo.find({ where: { id: In(ids) } });
  }

  async findManyByIdsOrFail(ids: number[]): Promise<TagEntity[]> {
    const tags = await this.findManyByIds(ids);

    if (ids.length !== tags.length) {
      throw new NotFoundException(`Not all ids found`);
    }

    return tags;
  }
}
