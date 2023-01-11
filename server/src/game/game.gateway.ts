import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { createGameDto } from './dto/create.game-dto';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { joinGameDto } from './dto/join.game-dto';
import { Repository } from 'typeorm';
import { Player } from 'src/entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
@WebSocketGateway()
export class GameGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server
  constructor(private readonly gameService: GameService,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>
  ) { }

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      const hash = socket.handshake.headers.hash
      const username = socket.handshake.query.username as string; // convert to only string
      const player = await this.playerRepository.findOne({
        where: {
          name: username
        }
      })

      if (!player) {
        console.log({ errorMessage: "Could not find player with name " + username });
        socket.disconnect();
      }

      if (player.hash !== hash) {
        console.log({ errorMessage: 'Invalid hash provided' });
        socket.disconnect();
      }

      console.log(`Successfully connected to socket for player ${username}`);
    });
  }



  @SubscribeMessage('newGame')
  onNewGame(@MessageBody() body: createGameDto) {
    return this.gameService.createGame(body)
  }

  @SubscribeMessage('joinGame')
  onJoinGame(@MessageBody() body: joinGameDto) {
    return this.gameService.joinGame(body)
  }

  //@SubscribeMessage('leaveGame')
  //onLeaveGame(@MessageBody() body)
}
