import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { ArticleTypeEnum } from '@domain/article/types/article-type.enum';
import { TagEntity } from '@domain/tag/tag.entity';

@Entity()
export class ArticleEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'enum', enum: ArticleTypeEnum })
  type: ArticleTypeEnum;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.articles)
  @JoinTable({ name: 'article_tags' })
  tags: TagEntity[];
}
