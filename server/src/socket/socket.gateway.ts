import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { UnauthorizedException, UseFilters } from "@nestjs/common";
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { WsCatchAllFilter } from 'src/exception/ws-filter';
import { SocketService } from './socket.service';
import { IGetUserType } from 'src/game/interface/user.interface';
import { GameSocket } from './game.socket';
import { WsUnauthorizedException } from 'src/exception/ws-exceptions';
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
        return this.disconnect(socket);
      }
  
      socket.gameId = gameId
      socket.join(gameId.toString())
      console.log(socket.rooms);
      
  
    } catch (error) {
      return this.disconnect(socket);
    }
  }
  

  async handleDisconnect(socket: GameSocket) {
    socket.disconnect();
  }


  private disconnect(socket: GameSocket) {
    throw new WsUnauthorizedException('helloo')
  }
}