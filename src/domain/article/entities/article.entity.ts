import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleTypeEnum } from '@domain/article/types/article-type.enum';
import { TagEntity } from '@domain/tag/entities/tag.entity';

@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
