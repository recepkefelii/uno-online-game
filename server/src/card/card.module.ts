import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/entities/card.entity';
import { Game } from 'src/entities/game.entity';
import { Player } from 'src/entities/player.entity';
import { CardService } from './card.service';

@Module({
    imports: [TypeOrmModule.forFeature([Card,Player,Game])],
    providers : [CardService],
    exports:[CardService]
})
export class CardModule {}
