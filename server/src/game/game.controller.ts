import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/shared/auth.decorator';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { createGameDto } from './dto/create.game-dto';
import { joinGameDto } from './dto/join.game-dto';
import { GameService } from './game.service';
import { IGetUserType } from './interface/user.interface';

@Controller('game')
export class GameController {
    constructor(
        private readonly gameService: GameService,
    ) { }
    @Post('create')
    @UseGuards(AuthGuard)
    async createGame(@Body() body: createGameDto, @GetUser() user: IGetUserType) {
        return this.gameService.createGame(body, user)
    }
    @Post('join')
    @UseGuards(AuthGuard)
    async joinGame(@Body() body: joinGameDto, @GetUser() user: IGetUserType) {
        return this.gameService.joinGame(body, user)
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
