import { UserEntity } from '@domain/user/entities/user.entity';
import { TagEntity } from '@domain/tag/entities/tag.entity';
import { UserAuthTokensEntity } from '@domain/user/entities/user-auth-tokens.entity';
import { ArticleEntity } from '@domain/article/entities/article.entity';

export const entitiesArray = [
  UserEntity,
  TagEntity,
  UserAuthTokensEntity,
  ArticleEntity,
];
