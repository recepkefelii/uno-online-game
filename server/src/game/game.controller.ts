import { Controller, Post,Body } from '@nestjs/common';
import { createGameDto } from './dto/create.game-dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private readonly gameService:GameService){}
    @Post('create')
    createGame(@Body() body:createGameDto){
        return this.gameService.createGames(body)
    }
}
