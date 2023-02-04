import { Injectable } from "@nestjs/common";
import GameRules from "../card/card-dealing.service";

@Injectable()
export class CheckMatch extends GameRules {
    checkUserMatch(socket: any) {
        const username = socket.handshake.query.username
        return username;
    }
}