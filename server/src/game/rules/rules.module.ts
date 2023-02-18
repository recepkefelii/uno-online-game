import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "src/entities/card.entity";
import { Game } from "src/entities/game.entity";
import { Player } from "src/entities/player.entity";
import { CheckMatchService } from "./service/match/check-match.service";
import { RulesGateway } from "./rules.gateway";
import { Rules } from "./rules.service";


@Module({
    imports: [TypeOrmModule.forFeature([Game, Player, Card,])],
    providers: []
})
export class RulesModule { }