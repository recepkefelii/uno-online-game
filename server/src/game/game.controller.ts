import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { createGameDto } from './dto/create.game-dto';
import { joinGameDto } from './dto/join.game-dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) { }
    @Post('create')
    @UseGuards(AuthGuard)
    async createGame(@Body() body: createGameDto) {
        return this.gameService.createGame(body)
    }
    @Post('join')
    @UseGuards(AuthGuard)
    async joinGame(@Body() body: joinGameDto) {
        return this.gameService.joinGame(body)
    }
    @Get('get')
    async getAllRooms() {
        return this.gameService.getAllRooms()
    }
    @UseGuards(AuthGuard)
    @Post('leave')
    async leaveGame() {

    }
}
