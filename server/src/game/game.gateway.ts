import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { createGameDto } from './dto/create.game-dto';
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
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

  logger: Logger

  @WebSocketServer()
  server: Server

  constructor(private readonly gameService: GameService,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,

    @InjectRepository(Game)
    private readonly GameRepository: Repository<Game>,
  ) {
    this.logger = new Logger(GameGateway.name)
  }

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      this.logger.verbose(`Client socket with id ${socket.id} is trying to connect`)
      const username = socket.handshake.query.username as string;  // convert to only string

      if (!username) {
        this.logger.log(`Username is not entered as parameter.
        The client with id ${socket.id} could not be allowed to connect socket`)
        socket.disconnect()
      }

      const player = await this.playerRepository.findOne({
        where: {
          name: username
        }
      })


      if (!player) {
        this.logger.warn(`Socket connection not allowed because there is no user named ${player.name}`)
        return socket.disconnect();
      }

      const verifyUsername = await bcrypt.compare(username, player.hash)

      if (!verifyUsername) {
        this.logger.warn(`Could not decode the hash of ${player.name}`)
        return socket.disconnect();
      }
      this.logger.verbose(`User with id ${socket.id} connected socket successfully`)
      socket.on('disconnect', async () => {
        this.logger.warn(`Disconnect event triggered by client with id ${socket.id}`)
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
            this.logger.log(`Game named ${game.name} has been deleted successfully`)
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
