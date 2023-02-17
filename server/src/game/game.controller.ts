import { Controller, Post,Body, Get } from '@nestjs/common';
import { createGameDto } from './dto/create.game-dto';
import { joinGameDto } from './dto/join.game-dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private readonly gameService:GameService){}
    @Post('create')
    createGame(@Body() body:createGameDto){
        return this.gameService.createGame(body)
    }
    @Post('join')
    joinGame(@Body() body: joinGameDto){
        return this.gameService.joinGame(body)
    }
    @Get('get')
    getAllRooms(){
       return this.gameService.getAllRooms() 
    }
}
