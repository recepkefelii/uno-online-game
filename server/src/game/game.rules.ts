import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Player } from "src/entities/player.entity";
import { Repository } from 'typeorm';


interface gameState {
    cardDealing(userId,gameId,) : void
}


@Injectable()
class GameRules implements gameState {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>
    ) {}
    cardDealing(userId,gameId) {
        
    }
}