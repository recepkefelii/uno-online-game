import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
