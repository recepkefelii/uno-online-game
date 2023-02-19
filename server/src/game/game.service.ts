import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { createGameDto } from './dto/create.game-dto';
import { joinGameDto } from './dto/join.game-dto';
import { Game } from '../entities/game.entity';
import { IGetUserType } from './interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/entities/player.entity';
import { Card } from 'src/entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  logger: Logger
  constructor(
    @InjectRepository(Game)
    public readonly gameRepository: Repository<Game>,
    @InjectRepository(Player)
    public readonly playerRepository: Repository<Player>,
    @InjectRepository(Card)
    public readonly cardRepository: Repository<Card>,
  ) {
    this.logger = new Logger(GameService.name)
  }

  //Create Game Service
  async createGame(body: createGameDto, user: IGetUserType) {
    try {
      const ownerPlayer = await this.playerRepository.findOneOrFail({ where: { name: user.name } });
      const game = new Game();
      game.name = body.name;
      game.players = [ownerPlayer];
      game.owner = user.name;
      game.maxPlayers = body.maxPlayers;
      game.currentPlayers = 1

      if (body.isPrivate) {
        game.password = body.password;
      }

      const newGame = await this.gameRepository.save(game);

      this.logger.log(`ID ${newGame.id} game successfully created`);
      this.logger.log(`User named ${ownerPlayer.name} successfully entered the room created`);

      return newGame;
    } catch (error) {
      this.logger.error(`An error occurred while creating the game: ${error.message}`);
      throw new HttpException('unsuccessful', HttpStatus.BAD_REQUEST);
    }
  }




  //Join Game Service
  async joinGame(body: joinGameDto, user: IGetUserType) {
    const game = await this.gameRepository.findOneOrFail({
      where: { id: body.gameId },
      relations: ['players']
    });

    if (!game) {
      throw new HttpException('Game not found', HttpStatus.BAD_REQUEST);
    }

    if (game.private && body.password !== game.password) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }

    const player = await this.playerRepository.findOne({
      where: { name: user.name }
    });

    if (!player) {
      return { error: 'Player not found' };
    }

    if (game.currentPlayers >= game.maxPlayers) {
      return { error: 'Game is full' };
    }

    game.players.push(player);
    game.currentPlayers += 1;

    if (game.maxPlayers === game.currentPlayers) {
      game.status = true;
    }

    await this.gameRepository.save(game);
    this.logger.log(`User named ${player.name} successfully logged into room ${game.name}`);

    return {
      message: 'Successfully joined game',
      user: {
        name: player.name,
        id: player.id
      }
    };
  }
  async getAllRooms() {
    return this.gameRepository.find()
  }
}