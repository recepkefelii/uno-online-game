import { Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Card } from "src/entities/card.entity";
import { CardId, GetCards } from "./dto/cards.dto";
import GameRules from "./service/card/card-dealing.service";

@Injectable()
export class Rules extends GameRules {
    async getPlayerCards(gameId: number, username: string) {
        const game = await this.gameRepository.findOne({
            where: { id: gameId },
            relations: {
                players: {
                    cards: true
                }
            }
        });

        const player = game.players.find(player => player.name === username);

        this.logger.log(`The cards of ${username} have been successfully brought`)
        return player.cards;

    }


    async getMainCard(gameId: number) {
        const game = await this.gameRepository.findOne({
            where: {
                id: gameId
            },
            relations: {
                cards: true
            }
        })
        const mainCard = game.cards.find(card => card.isMain === true);
        return mainCard;
    }

    async playerMakeMove(currentCard: Card[], gameId: number, username: string, cardId: number, mainCard: Card) {
        const card = await this.cardRepository.findOne({
            where: {
                game: {
                    id: gameId
                },
                player: {
                    name: username
                },
                id: cardId
            }
        });

        if (!card) {
            this.logger.error("This card is not in your hand")
            return {"error": 'This card is not in your hand'};
        }

        const changeCard = await this.cardControl(card, mainCard)

        const currentMainCard = await this.gameRepository.findOne({
            where: {
                id: gameId
            },
            relations: {
                cards: true
            }
        })

        const findMainCard = currentMainCard.cards.find(card => card.isMain === true)

        findMainCard.color = changeCard.color
        findMainCard.value = changeCard.value
        this.cardRepository.save(findMainCard)
        this.cardRepository.remove(changeCard)
    }
}