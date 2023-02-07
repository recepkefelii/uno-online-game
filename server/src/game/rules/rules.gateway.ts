import { Body, Injectable } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Socket } from "dgram";
import { Server } from "socket.io"
import { GetCards } from "./dto/cards.dto";
import { Rules } from "./rules.service";
import { CheckMatchService } from "./service/match/check-match.service";


@Injectable()
@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class RulesGateway {
  constructor(private readonly checkService: CheckMatchService,
    private readonly rulesService: Rules
  ) { }
  @WebSocketServer() server: Server

  @SubscribeMessage('getCards')
  async getCards(@ConnectedSocket() socket: any) {
    try {
      const username = socket.handshake.query.username;
      const gameId = await this.checkService.checkUserMatch(username);
      const cards = await this.rulesService.getPlayerCards(gameId, username)
      this.server.emit('play', cards)
      return cards
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('getMainCard')
  async getMainCards(@ConnectedSocket() socket: any) {
    const username = socket.handshake.query.username;
    const gameId = await this.checkService.checkUserMatch(username)
    const mainCard = await this.rulesService.getMainCards(gameId)
    this.server.emit('play', mainCard)
    return mainCard
  }
}