import { Column, Entity, ManyToMany } from 'typeorm';
import { ArticleEntity } from '@domain/article/article.entity';

@Entity()
export class TagEntity {
  @Column()
  title: string;

  @ManyToMany(() => ArticleEntity, (article: ArticleEntity) => article.tags)
  articles: ArticleEntity[];
}
