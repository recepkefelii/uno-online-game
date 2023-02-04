import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "src/entities/card.entity";
import { Game } from "src/entities/game.entity";
import { Move } from "src/entities/move.entity";
import { Player } from "src/entities/player.entity";
import { CheckMatch } from "./service/match/check-match.service";
import { RulesGateway } from "./rules.gateway";
import { Rules } from "./rules.service";


@Module({
    imports: [TypeOrmModule.forFeature([Game, Player, Card, Move])],
    providers: [RulesGateway, Rules, CheckMatch]
})
export class RulesModule { }