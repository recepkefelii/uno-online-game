import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// Dev Env
export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nest-js',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['dist/**/*.entity.js'],
  synchronize: true
}

// Docker env

// export const ormConfig: TypeOrmModuleOptions = {
 // type: 'postgres',
 // host: process.env.POSTGRES_HOST || 'postgres-database',
 // port: +process.env.POSTGRES_PORT || 5431,
 // username: process.env.DB_USERNAME || 'postgres',
 // password: process.env.DB_PASSWORD || 'postgres',
 // database: process.env.POSTGRES_DB || 'nest-js',
 // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
 // migrations: ['dist/**/*.entity.js'],
 // synchronize: true
//}