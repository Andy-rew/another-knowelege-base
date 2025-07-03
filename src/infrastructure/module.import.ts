import { entitiesArray } from './entities.array';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { validateEnv } from './utils/environment.validation';
import { CONFIGS, Database, loadConfiguration } from './types/configuration';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@domain/user/user.module';
import { AuthModule } from '@domain/auth/auth.module';
import { TagModule } from '@domain/tag/tag.module';
import { ArticleModule } from '@domain/article/article.module';

export const ModuleImport = [
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [loadConfiguration],
    validate: validateEnv,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      ({
        type: configService.get<Database>(CONFIGS.database).type,
        host: configService.get<Database>(CONFIGS.database).host,
        port: configService.get<Database>(CONFIGS.database).port,
        username: configService.get<Database>(CONFIGS.database).username,
        password: configService.get<Database>(CONFIGS.database).password,
        database: configService.get<Database>(CONFIGS.database).database,
        entities: entitiesArray,
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(),
      }) as TypeOrmModuleOptions,
  }),
  UserModule,
  AuthModule,
  TagModule,
  ArticleModule,
];
