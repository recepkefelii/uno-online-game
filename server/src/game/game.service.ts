import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createGameDto } from './dto/create.game-dto';
import { joinGameDto } from './dto/join.game-dto';
import { Game } from '../entities/game.entity';
import * as bcrypt from "bcrypt";
import GameRules from './rules/service/card/card-dealing.service';

@Injectable()
export class GameService extends GameRules {

  async createGame(body: createGameDto) {
    try {
      const ownerPlayer = await this.playerRepository.findOneOrFail({ where: { name: body.username } });

      const game = new Game();
      game.name = body.name;
      game.players = [ownerPlayer];
      game.owner = body.username;
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
  async joinGame(body: joinGameDto) {
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
    where: { name: body.username }
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
    await this.cardDealing(game);
    this.mainCard(game);
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