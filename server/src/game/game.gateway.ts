import { MessageBody, SubscribeMessage, WebSocketGateway  } from '@nestjs/websockets';
import { GameService } from './game.service';

@WebSocketGateway()
export class GameGateway {
    constructor(private readonly gameService:GameService){}
    
    @SubscribeMessage('newGame')
    onNewGame(@MessageBody() body:any){
        return this.gameService.createGame(body)
    }
}
