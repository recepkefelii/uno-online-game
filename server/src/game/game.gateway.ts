import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { createGameDto } from './dto/create.game-dto';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Server, } from 'socket.io';
import { joinGameDto } from './dto/join.game-dto';
import { Repository } from 'typeorm';
import { Player } from 'src/entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entities/game.entity';
import * as bcrypt from "bcrypt";

@Injectable()
@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class GameGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server

  constructor(private readonly gameService: GameService,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,

    @InjectRepository(Game)
    private readonly GameRepository: Repository<Game>,
  ) { }

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      const username = socket.handshake.query.username as string;  // convert to only string

      if (!username) {
        socket.disconnect()
      }

      const player = await this.playerRepository.findOne({
        where: {
          name: username
        }
      })


      if (!player) {
        return socket.disconnect();
      }

      const verifyUsername = await bcrypt.compare(username, player.hash)

      if (!verifyUsername) {
        return socket.disconnect();
      }

      socket.on('disconnect', async () => {
        const user = await this.playerRepository.findOne({
          where: { name: username },
          relations: ['game']
        });
        user.cards

        if (user.game) {
          const game = await this.GameRepository.findOne({
            where: { id: user.game.id },
            relations: {
              cards: true,
              players: true
            }
          });

          game.currentPlayers--;
          await this.GameRepository.save(game);

          user.game = null;
          user.cards = null
          await this.playerRepository.save(user);

          if (game.currentPlayers === 0) {
            socket.broadcast.emit('onDeleteGame', {
              id: game.id,
              name: game.name
            });
            await this.GameRepository.remove(game);
          }
        }
      });
    });

  };

  @SubscribeMessage('newGame')
  async onNewGame(@MessageBody() body: createGameDto, @ConnectedSocket() socket: any) {
    const ownerPlayer = socket.handshake.query.username
    const newGame = await this.gameService.createGame(body, ownerPlayer)

    socket.broadcast.emit('onNewGame', {
      newGame
    })

    return newGame
  }

  @SubscribeMessage('joinGame')
  async onJoinGame(@MessageBody() body: joinGameDto, @ConnectedSocket() socket: any) {
    const join = await this.gameService.joinGame(body, socket)
    this.server.emit('onJoinGame', {
      join
    })
    return join
  }
  @SubscribeMessage('getRooms')
  async handleGetRooms(@MessageBody() body: string, @ConnectedSocket() socket: any) {
    const allRooms = await this.GameRepository.find();

    this.server.emit('allRooms', allRooms);
  }
}
