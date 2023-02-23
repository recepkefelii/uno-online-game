import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/entities/card.entity';
import { Game } from 'src/entities/game.entity';
import { Player } from 'src/entities/player.entity';
import { RulesGateway } from './rules.gateway';
import { RulesService } from './rules.service';

@Module({
    imports: [TypeOrmModule.forFeature([Player,Game,Card])],
    providers: [RulesGateway,RulesService]
})
export class RulesModule {}
