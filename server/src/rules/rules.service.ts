import { Injectable, Logger, UseFilters } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "src/entities/card.entity";
import { Game } from "src/entities/game.entity";
import { Player } from "src/entities/player.entity";
import { WsBadRequestException, WsUnauthorizedException, WsUnknownException } from "src/exception/ws-exceptions";
import { WsCatchAllFilter } from "src/exception/ws-filter";
import { IGetUserType } from "src/game/interface/user.interface";
import { Repository } from "typeorm";

@UseFilters(new WsCatchAllFilter())
@Injectable()
export class RulesService {
    logger: Logger
    constructor(@InjectRepository(Player) private readonly playerRepository: Repository<Player>,
        @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
        @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
    ) {
        this.logger = new Logger()
    }

    async start(user: IGetUserType, id: number) {
        const game = await this.gameRepository.findOneOrFail({
            where: { id }, relations: { players: true }
        })

        if (user.name !== game.owner) {
            throw new WsBadRequestException('You do not have enough privileges to start the game')
        }

        if (game.currentPlayers < 2) {
            throw new WsBadRequestException('There must be at least 2 people in the room')
        }

        if (game.status === true) {
            throw new WsBadRequestException('Already start the game')
        }

        game.status = true
        this.gameRepository.save(game)
        return { "game": "started" }
    }
}