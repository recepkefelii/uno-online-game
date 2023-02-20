import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { createGameDto } from './dto/create.game-dto';
import { joinGameDto } from './dto/join.game-dto';
import { IGetUserType } from './interface/user.interface';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

type Game = {
  name: string;
  players: string[];
  owner: string;
  maxPlayers: number;
  currentPlayers: number;
  password: string;
  private: boolean;
  status: boolean; // boolean olarak tanımlanmış status özelliği
}

@Injectable()
export class GameService {
  private readonly logger: Logger;

  constructor(
    @InjectRedis() private readonly redis: Redis
  ) {
    this.logger = new Logger(GameService.name);
  }

  async createGame(body: createGameDto, user: IGetUserType) {
    try {
      const gameId = uuidv4();
      const game: Game = {
        name: body.name,
        players: [user.name],
        owner: user.name,
        maxPlayers: body.maxPlayers,
        currentPlayers: 1,
        password: body.password,
        private: body.isPrivate,
        status: false
      };

      //Return success for 'OK'
      const result = await this.redis.hmset(`game:${gameId}`, game);

      if (result !== 'OK') {
        throw new Error('Failed to create game in Redis');
      }

      this.logger.log(`ID ${gameId} game successfully created`);
      this.logger.log(`User named ${user.name} successfully entered the room created`);

      return { id: gameId, ...game };
    } catch (error) {
      this.logger.error(`An error occurred while creating the game: ${error.message}`);
      throw new HttpException('Failed to create game', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async joinGame(body: joinGameDto, user: IGetUserType) {
    const game: Record<string, string> = await this.redis.hgetall(`game:${body.gameId}`);

    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }

    const { name, players, status, owner, maxPlayers, currentPlayers, password, isPrivate } = game;

    if (isPrivate && body.password !== password) {
      console.log(isPrivate, password);

      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    if (+currentPlayers >= +maxPlayers) {
      throw new HttpException('Game is full', HttpStatus.BAD_REQUEST);
    }

    const playersArr = players.split(',');

    if (playersArr.includes(user.name)) {
      return {
        message: 'Already joined the game',
        user: {
          name: user.name,
          id: user.id
        }
      };
    }

    playersArr.push(user.name);
    const newGame: Record<string, string | boolean> = {
      ...game,
      players: playersArr.join(','),
      currentPlayers: playersArr.length.toString(),
      status: maxPlayers === currentPlayers
    };


    const result = await this.redis.hmset(`game:${body.gameId}`, newGame);

    if (result !== 'OK') {
      throw new HttpException('Failed to join the game', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log(`User named ${user.name} successfully logged into room ${newGame.name}`);

    return { ...newGame };

  }

  async getAllRooms() {
    const keys = await this.redis.keys('game:*');
    const games = await Promise.all(
      keys.map(async (key: any) => {
        const game = await this.redis.hgetall(key);
        return { id: key.split(':')[1], ...game };
      })
    );
    return games;
  }
}