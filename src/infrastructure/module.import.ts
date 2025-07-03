import {loadConfiguration} from "@nestjs/cli/lib/utils/load-configuration";
import { ConfigModule, ConfigService } from '@nestjs/config';
import {entitiesArray} from "./entities.array";
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {validateEnv} from "./utils/environment.validation";
import {CONFIGS, Database} from "./types/configuration";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";



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
            } as TypeOrmModuleOptions),
    }),
];
