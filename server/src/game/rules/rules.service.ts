import { Injectable } from "@nestjs/common";
import GameRules from "./service/card/card-dealing.service";

@Injectable()
export class Rules extends GameRules {
    async getPlayerCards(gameId: number, username: string) {
        const game = await this.gameRepository.findOne({
            where: { id: gameId },
            relations: {
                players : {
                    cards : true
                }
            }
        });
        if (!game) {
            throw new Error(`Game with id "${gameId}" not found.`);
        }

        const player = game.players.find(p => p.name === username);
        console.log(player);
        

        if (!player) {
            throw new Error(`Player "${username}" not found in game with id "${gameId}".`);
        }

        return player.cards;
    }

}