import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm.config';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { RedisModule } from '@liaoliaots/nestjs-redis';
import { SocketModule } from './socket/socket.module';
import { RulesModule } from './rules/rules.module';
import { CardModule } from './card/card.module';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), GameModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
    SocketModule,
    RulesModule,
    CardModule,
  ]
})
export class AppModule {
}
