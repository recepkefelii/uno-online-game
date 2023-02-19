import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../entities/game.entity';
import { Player } from '../entities/player.entity';
import { Card } from 'src/entities/card.entity';
import { RulesModule } from './rules/rules.module';
import { GameController } from './game.controller';
import { RedisModule } from 'nestjs-redis';
@Module({
    imports: [TypeOrmModule.forFeature([Game, Player, Card]), RulesModule,RedisModule],
    providers: [GameService],
    controllers: [GameController]
})
export class GameModule {

}
