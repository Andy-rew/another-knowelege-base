import { Module } from '@nestjs/common';
import { ModuleImport } from '@infrastructure/module.import';

@Module({
  imports: ModuleImport,
  controllers: [],
  providers: [],
})
export class AppModule {}
