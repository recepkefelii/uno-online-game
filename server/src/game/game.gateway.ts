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

@Injectable()
@WebSocketGateway()
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

      const hash = socket.handshake.headers.hash
      const username = socket.handshake.query.username as string; // convert to only string
      const player = await this.playerRepository.findOne({
        where: {
          name: username
        }
      })

      if (!player) {
        console.log({ errorMessage: "Could not find player with name " + username });
        return socket.disconnect();
      }

      if (player.hash !== hash) {
        console.log({ errorMessage: 'Invalid hash provided' });
        return socket.disconnect();
      }

      socket.on('disconnect', async () => {
        const fetchUser = await this.playerRepository.findOne({
          where: { name: username }, relations: {
            game: true
          }
        });

        const checkGames = await this.GameRepository.findOne({
          where: {
            id: fetchUser.game.id
          },
          relations: {
            players: true
          }
        })
        if(checkGames.currentPlayers == 0){
          this.GameRepository.remove(checkGames)
        }

        checkGames.currentPlayers -= 1
        const updateGame = await this.GameRepository.save(checkGames)
        console.log(checkGames);
        console.log(updateGame);

        if (fetchUser) {
          fetchUser.game = null;
          const currentPlayers = await this.playerRepository.save(fetchUser);
          console.log(currentPlayers);
        }
      });
    });

  };

  @SubscribeMessage('newGame')
  async onNewGame(@MessageBody() body: createGameDto, @ConnectedSocket() socket) {
    const ownerPlayer = socket.handshake.query.username
    const newGame = await this.gameService.createGame(body, ownerPlayer)

    this.server.emit('onNewGame', {
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
}
