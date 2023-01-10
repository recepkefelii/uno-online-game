import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer  } from '@nestjs/websockets';
import { GameService } from './game.service';
import { createGameDto } from './dto/create.game-dto';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { joinGameDto } from './dto/join.game-dto';
@WebSocketGateway()
export class GameGateway implements OnModuleInit {
    @WebSocketServer()
    server:Server
    constructor(private readonly gameService:GameService){}

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
        })
    }

    @SubscribeMessage('newGame')
    onNewGame(@MessageBody() body:createGameDto){
        return this.gameService.createGame(body)
    }

    @SubscribeMessage('joinGame')
    onJoinGame(@MessageBody() body:joinGameDto){
        return this.gameService.joinGame(body)
    }
}
