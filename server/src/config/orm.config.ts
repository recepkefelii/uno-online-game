import { TypeOrmModuleOptions } from "@nestjs/typeorm";



export const ormConfig: TypeOrmModuleOptions = {
 type: 'postgres',
 host: process.env.POSTGRES_HOST || 'localhost',
 port: +process.env.POSTGRES_PORT || 5432,
 username: process.env.DB_USERNAME || 'postgres',
 password: process.env.DB_PASSWORD || 'postgres',
 database: process.env.POSTGRES_DB || 'nest-js',
 entities: [__dirname + '/../**/*.entity{.ts,.js}'],
 migrations: ['dist/**/*.entity.js'],
 synchronize: true
}