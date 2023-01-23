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
  cors: ['http://localhost:3001',]
})
export class GameGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server

  constructor(private readonly gameService: GameService,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,

    @InjectRepository(Game)
    private readonly GameRepository: Repository<Game>
  ) { }

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      const username = socket.handshake.query.username as string; // convert to only string
      if (!username) socket.disconnect()

      const player = await this.playerRepository.findOne({
        where: {
          name: username
        }
      })

      if (!player) {
        return socket.disconnect();
      }

      const verifyUsername = await bcrypt.compare(player.hash, username)

      if (!verifyUsername) {
        return socket.disconnect();
      }

      socket.on('disconnect', async () => {
        const fetchUser = await this.playerRepository.findOne({
          where: { name: username }, relations: {
            game: true
          }
        });
        if (fetchUser.game && fetchUser.game.id) {
          const checkGames = await this.GameRepository.findOne({
            where: {
              id: fetchUser.game.id
            },
            relations: {
              players: true
            }
          })

          checkGames.currentPlayers -= 1
          await this.GameRepository.save(checkGames)

          if (fetchUser) {
            fetchUser.game = null;
            const currentPlayers = await this.playerRepository.save(fetchUser);
            if (checkGames.currentPlayers == 0) {
              socket.broadcast.emit('onDeleteGame', {
                "id": checkGames.name,
                "name": checkGames.name
              })
              this.GameRepository.remove(checkGames)
            }
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
  async handleGetRooms(@MessageBody() body:string ,@ConnectedSocket() socket: any) {
      const allRooms = await this.GameRepository.find();
      
      this.server.emit('allRooms', allRooms);
    }
  }
