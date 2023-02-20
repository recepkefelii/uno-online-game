import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { createGameDto } from './dto/create.game-dto';
import { joinGameDto } from './dto/join.game-dto';
import { IGetUserType } from './interface/user.interface';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { IGame } from './interface/game.interface';


@Injectable()
export class GameService {
  private readonly logger: Logger;

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.logger = new Logger(GameService.name);
  }

  async createGame(body: createGameDto, user: IGetUserType): Promise<IGame> {
    const gameId = uuidv4();
    const game: IGame = {
      id: gameId,
      name: body.name,
      players: [user.name],
      owner: user.name,
      maxPlayers: body.maxPlayers,
      currentPlayers: 1,
      password: body.password,
      isPrivate: body.isPrivate,
      status: false,
    };

    const result = await this.redis.set(`game:${gameId}`, JSON.stringify(game));

    if (result !== 'OK') {
      throw new HttpException('Failed to create game', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log(`ID ${gameId} game successfully created`);
    this.logger.log(`User named ${user.name} successfully entered the room created`);

    return game;
  }

  async joinGame(body: joinGameDto, user: IGetUserType): Promise<IGame> {
    const gameString = await this.redis.get(`game:${body.gameId}`);

    if (!gameString) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }

    const game: IGame = JSON.parse(gameString);

    if (game.isPrivate && game.password !== body.password) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    if (game.currentPlayers >= game.maxPlayers) {
      throw new HttpException('Game is full', HttpStatus.BAD_REQUEST);
    }

    if (game.players.includes(user.name)) {
      return game;
    }

    game.players.push(user.name);
    game.currentPlayers++;

    if (game.currentPlayers === game.maxPlayers) {
      game.status = true;
    }

    const result = await this.redis.set(`game:${body.gameId}`, JSON.stringify(game));

    if (result !== 'OK') {
      throw new HttpException('Failed to join the game', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log(`User named ${user.name} successfully logged into room ${game.name}`);

    return game;
  }

  async getAllRooms(): Promise<IGame[]> {
    const keys = await this.redis.keys('game:*');

    const games = await Promise.all(
      keys.map(async (key: string) => {
        const gameString = await this.redis.get(key);
        return gameString ? JSON.parse(gameString) : null;
      }),
    );

    return games.filter((game: IGame) => game !== null);
  }
}
