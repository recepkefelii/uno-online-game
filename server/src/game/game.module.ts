import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../entities/game.entity';
import { Player } from '../entities/player.entity';
import { Card } from 'src/entities/card.entity';
import { Move } from 'src/entities/move.entity';
import { RulesModule } from './rules/rules.module';
@Module({
    imports: [TypeOrmModule.forFeature([Game,Player,Card,Move]),RulesModule],
    providers: [GameGateway, GameService]
})
export class GameModule {

}
