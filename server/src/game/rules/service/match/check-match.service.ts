import { Injectable, } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import GameRules from "../card/card-dealing.service";

@Injectable()
export class CheckMatchService extends GameRules {
    async checkUserMatch(username: string) {
        const user = await this.playerRepository.findOne({
            where: {
                name: username
            },
            relations: {
                game: true
            }
        });

        if (!user || !user.game || !user.game.id) {
            this.logger.log(`User ${username} is not in any game`)
            throw new WsException("User or user's game not found",);
        }
        return user.game.id;
    }
}