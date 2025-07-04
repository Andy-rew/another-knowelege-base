import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from '@domain/article/entities/article.entity';

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => ArticleEntity, (article: ArticleEntity) => article.tags)
  articles: ArticleEntity[];
}
