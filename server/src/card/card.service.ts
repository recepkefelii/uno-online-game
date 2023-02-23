import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "src/entities/card.entity";
import { Game } from "src/entities/game.entity";
import { Player } from "src/entities/player.entity";
import { WsBadRequestException } from "src/exception/ws-exceptions";
import { Repository } from "typeorm";

@Injectable()
export class CardService{
    constructor(
        @InjectRepository(Player) private readonly playerRepository: Repository<Player>,
        @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
        @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
    ){}


  
}

    