import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from 'src/card/card.module';
import { CardService } from 'src/card/card.service';
import { Card } from 'src/entities/card.entity';
import { Game } from 'src/entities/game.entity';
import { Player } from 'src/entities/player.entity';
import { Turn } from 'src/entities/turn.entity';
import { RulesGateway } from './rules.gateway';
import { RulesService } from './rules.service';

@Module({
    imports: [TypeOrmModule.forFeature([Player,Game,Card,Turn]),CardModule],
    providers: [RulesGateway,RulesService,CardService]
})
export class RulesModule {}
