import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from "socket.io";
import { UseFilters } from "@nestjs/common";
import { WsCatchAllFilter } from 'src/exception/ws-filter';
import { SocketService } from './socket.service';
import { IGetUserType } from 'src/game/interface/user.interface';
import { GameSocket } from './game.socket';
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({ cors: { origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5173'] } })
export class SocketGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly socketService: SocketService

  ) { }

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: GameSocket) {
    try {
      const user = this.socketService.validateToken(socket.handshake.headers.authorization) as unknown as IGetUserType
      const gameId = await this.socketService.getUserGameId(user.name)

      if (!gameId) socket.disconnect()

      if (!user) {
        return socket.disconnect()
      }
      const { id, status } = gameId
      socket.gameId = id

      if (!status) {
        socket.disconnect()
      }
      socket.join(gameId.toString())


    } catch (error) {
      socket.disconnect()
    }
  }


  async handleDisconnect(socket: GameSocket) {
    socket.disconnect();
  }


}