import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer  } from '@nestjs/websockets';
import { GameService } from './game.service';
import { gameDto } from './dto/create.game-dto';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
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
    onNewGame(@MessageBody() body:gameDto){
        return this.gameService.createGame(body)
    }
}
