import { Body, Injectable } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Socket } from "dgram";
import { Server } from "socket.io"
import { Card } from "src/entities/card.entity";
import { CardId } from "./dto/cards.dto";
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
      const uniqueEmit = gameId.toString()
      this.server.emit(uniqueEmit, cards)
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

  @SubscribeMessage("move")
  async playerMakemMove(@MessageBody() body: CardId, @ConnectedSocket() socket: any) {
    const [gameId, username] = await this.getGameIdAndUsername(socket);
    const cards = await this.getCards(socket)
    const mainCard = await this.getMainCards(socket)
    this.rulesService.playerMakeMove(cards, gameId, username, body.id, mainCard)
    const currentCards = await this.getCards(socket)
    const uniqueEmit = gameId.toString()
    this.server.emit(uniqueEmit, currentCards)
  }

}