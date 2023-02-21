import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm.config';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { SocketModule } from './socket/socket.module';
import { GameMiddleware } from './shared/middleware/game.middleware';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), GameModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  SocketModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GameMiddleware).forRoutes('game/create')
  }
 }
