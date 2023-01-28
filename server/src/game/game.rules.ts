import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "src/entities/game.entity";
import { Player } from "src/entities/player.entity";
import { Repository } from 'typeorm';


interface gameState {
    cardDealing(): void
}

@Injectable()
export default class GameRules implements gameState {
    constructor(
        @InjectRepository(Game)
        public readonly gameRepository: Repository<Game>,
        @InjectRepository(Player)
        public readonly playerRepository: Repository<Player>
    ) { }

    cardDealing() {
        console.log("running");

    }
}