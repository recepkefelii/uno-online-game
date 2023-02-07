import { Body, Injectable } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Socket } from "dgram";
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
  constructor(private readonly checkService: CheckMatchService,
    private readonly rulesService: Rules
  ) { }
  @WebSocketServer() server: Server

  private async getGameIdAndUsername(socket: any): Promise<[number, string]> {
    const username = socket.handshake.query.username;
    const gameId = await this.checkService.checkUserMatch(username);
    return [gameId, username];
  }

  @SubscribeMessage('getCards')
  async getCards(@ConnectedSocket() socket: any) {
    try {
      const [gameId, username] = await this.getGameIdAndUsername(socket);
      const cards = await this.rulesService.getPlayerCards(gameId, username)
      this.server.emit('play', cards)
      return cards
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('getMainCard')
  async getMainCards(@ConnectedSocket() socket: any) {
    try {
      const [gameId] = await this.getGameIdAndUsername(socket);
      const mainCard = await this.rulesService.getMainCards(gameId)
      this.server.emit('play', mainCard)
      return mainCard
    } catch (error) {
      throw new WsException(error.message);
    }
  }

}