import { Injectable } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
@Injectable()
export class SocketGateway {
    @WebSocketServer() server: Server

    // getUserCards event
    // getMainCard event
    // move event
    // drawCard event
    // start Game event
}