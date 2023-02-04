import { Injectable } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io"
import { CheckMatch } from "./service/match/check-match.service";


@Injectable()
@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class RulesGateway {
  constructor(private readonly checkMatch: CheckMatch) { }
  @WebSocketServer() server: Server


  @SubscribeMessage('play')
  async playCard(@MessageBody() body: any, @ConnectedSocket() socket: any) {
    const match = await this.checkMatch.checkUserMatch(socket)
  }
}