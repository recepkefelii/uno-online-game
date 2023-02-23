import { Injectable, UseFilters, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { WsBadRequestException } from "src/exception/ws-exceptions";
import { WsCatchAllFilter } from "src/exception/ws-filter";
import { IGetUserType } from "src/game/interface/user.interface";
import UserDecorator from "src/shared/decorator/ws-user.decorator";
import { WsAuthGuard } from "src/shared/guard/ws-auth.guard";
import { GameSocket } from "src/socket/game.socket";
import { RulesService } from "./rules.service";

@UseFilters(new WsCatchAllFilter())
@WebSocketGateway()
@Injectable()
export class RulesGateway {
    constructor(
    private readonly rulesService: RulesService,

    ) { }
    @WebSocketServer() server: Server


    @SubscribeMessage('start')
    @UseGuards(WsAuthGuard)
    async start(@ConnectedSocket() socket: GameSocket, @UserDecorator() user: IGetUserType) {

       const result =  await this.rulesService.start(user,socket.gameId)
       
       socket.to(socket.gameId.toString()).emit('game_start',result)
    }
}