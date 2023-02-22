import {OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from "socket.io";
import {UnauthorizedException} from "@nestjs/common";
import { AuthGuard } from 'src/shared/guard/auth.guard';

@WebSocketGateway({cors: {origin: ['http://localhost:3000', 'http://localhost:4200','http://localhost:5173']}})
export class SocketGateWay extends AuthGuard implements  OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    try {
    const user = this.validateToken(socket.handshake.headers.authorization);
  
      if(!user){
        console.log('disconnect users');
        return this.disconnect(socket);
      } 
    } catch (error) {
      console.log(error)
      return this.disconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    socket.disconnect();
  }


  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}