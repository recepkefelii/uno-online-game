import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const ormConfig:TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5431,
    username: 'postgres',
    password: '123',
    database: 'nest-js',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['dist/**/*.entity.js'],
    synchronize: true
  }