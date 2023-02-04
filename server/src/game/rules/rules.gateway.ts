import { Injectable } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server } from "socket.io"
import { Rules } from "./rules.service";
import { CheckMatchService } from "./service/match/check-match.service";


@Injectable()
@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class RulesGateway {
  constructor(private readonly checkMatch: CheckMatchService,
    private readonly rulesService: Rules
  ) { }
  @WebSocketServer() server: Server


  @SubscribeMessage('getCards')
  async getCards(@MessageBody() body: any, @ConnectedSocket() socket: any) {
    try {
      const username = socket.handshake.query.username;
      const match = await this.checkMatch.checkUserMatch(username);
      const cards = await this.rulesService.getCards(match, username)
      this.server.emit('play',cards)
    } catch (error) {
      throw new WsException(error.message);
    }
  }
}