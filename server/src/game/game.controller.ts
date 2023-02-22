import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { createGameDto } from './dto/create.game-dto';
import { joinGameDto } from './dto/join.game-dto';
import { GameService } from './game.service';
import { IGetUserType } from './interface/user.interface';
import { GetUser } from 'src/shared/decorator/auth.decorator';

@Controller('game')
export class GameController {
    constructor(
        private readonly gameService: GameService,
    ) { }
    @Post('create')
    @UseGuards(AuthGuard)
    async createGame(@Req() req:any,@Body() body: createGameDto, @GetUser() user: IGetUserType){
        return this.gameService.createGame(body, user)
    }
    @Post('join')
    @UseGuards(AuthGuard)
    async joinGame(@Body() body: joinGameDto, @GetUser() user: IGetUserType){
        return this.gameService.joinGame(body, user)
    }
    @Get('get')
    async getAllRooms() {
        return this.gameService.getAllRooms()
    }
    @UseGuards(AuthGuard)
    @Post('leave')
    async leaveGame() {
        return this.gameService.leaveGame()
    }
    // @Post('start')
    // @UseGuards(AuthGuard)
    // async start(@Req() request: any, @GetUser() user: IGetUserType) {
    //     console.log(request);
    //     return this.gameService.start(user)
    // }
}
