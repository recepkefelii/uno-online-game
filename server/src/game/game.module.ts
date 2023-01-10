import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../entities/game.entity';
@Module({
    imports: [ TypeOrmModule.forFeature([Game])],
    providers:[GameGateway, GameService]
})
export class GameModule {
    
}
