import { Injectable, Logger, UseFilters, SetMetadata } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CardService } from "src/card/card.service";
import { Card } from "src/entities/card.entity";
import { Game } from "src/entities/game.entity";
import { Player } from "src/entities/player.entity";
import { Turn } from "src/entities/turn.entity";
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
        @InjectRepository(Turn) private readonly turnRepository: Repository<Turn>,
        private readonly cardService: CardService
    ) {
        this.logger = new Logger()
    }

    async start(user: IGetUserType, gameId: number) {
        const game = await this.gameRepository.findOneOrFail({
            where: { id: gameId },
            relations: { players: true, turns: true },
        });

        if (user.name !== game.owner) {
            throw new WsBadRequestException('You do not have enough privileges to start the game');
        }

        if (game.currentPlayers < 2) {
            throw new WsBadRequestException('There must be at least 2 people in the room');
        }


        game.status = true;
        this.gameRepository.save(game);

        // Deal cards to players
        await this.cardService.cardDealind(game);

        await this.gameRepository.save(game);

        return { game: 'started' };
    }

    async move(id: number, gameId: number, user: IGetUserType) {
        const game = await this.gameRepository.findOneOrFail({
            where: { id: gameId },
            relations: ["turns", "players", "cards", "players.cards"]
        })

        const currentPlayerIndex = game.turns.length % game.players.length
        const currentPlayer = game.players[currentPlayerIndex]


        if (currentPlayer.name !== user.name) {
            throw new WsUnauthorizedException('It is not your turn')
        }

        const card = game.cards.find(c => c.id === id)
        if (!card) {
            throw new WsBadRequestException('The card is not in the deck')
        }

        const cardIndex = currentPlayer.cards.findIndex(c => c.id === id)
        if (cardIndex < 0) {
            throw new WsBadRequestException('You do not have this card')
        }
        const mainCard = game.cards.find(c => c.isMain === true)
        const checkMainCard = await this.cardService.cardControl(card, mainCard)

        currentPlayer.cards.splice(cardIndex, 1)
        await this.playerRepository.save(currentPlayer)

        const turn = new Turn()
        turn.player = currentPlayer
        game.turns.push(turn)
        await this.turnRepository.save(turn)
        await this.gameRepository.save(game)

        if (currentPlayer.cards.length === 0) {
            game.status = false
            await this.gameRepository.save(game)

            return { winner: currentPlayer }
        }
        delete currentPlayer.hash
        delete currentPlayer.cards
        return { currentPlayer, playedCard: card, mainCard: checkMainCard }
    }

    async drawCard(id: number, user: IGetUserType) {
        const game = await this.gameRepository.findOneOrFail({
            where: { id },
            relations: { players: true, cards: true, turns: true }
        })


        const currentPlayer = game.players.find(player => player.id === user.id)

        let card = await this.cardService.createMainCard(game, currentPlayer);
        delete card.player
        delete card.game

        const data = {
            response: { "currentPlayer": user.name, "card": card },
            info: user
        }

        return data
    }


}