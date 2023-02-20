import { CacheModule, CacheStore, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm.config';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), GameModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  RedisModule.forRoot({
    config: {
      host: 'localhost',
      port: 6379,
    }
  })
  ]
})
export class AppModule { }
