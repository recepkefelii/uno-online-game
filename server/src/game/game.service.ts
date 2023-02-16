import { Injectable } from '@nestjs/common';
import { createGameDto } from './dto/create.game-dto';
import { joinGameDto } from './dto/join.game-dto';
import { Game } from '../entities/game.entity';
import * as bcrypt from "bcrypt";
import GameRules from './rules/service/card/card-dealing.service';

@Injectable()
export class GameService extends GameRules {
  async createGame(body: createGameDto, ownerPlayer: any) {
    const owner = await this.playerRepository.findOne({
      where: {
        name: ownerPlayer
      }
    })

    if (body.isPrivate) {
      const salt = 10

      const passwordHash = await bcrypt.hash(body.password, salt)

      const game = new Game();
      game.name = body.name;
      game.maxPlayers = body.maxPlayers;
      game.password = passwordHash;
      game.owner = owner.name;
      game.private = true
      game.currentPlayers = 1;
      game.players = [owner]

      const newGame = this.gameRepository.save(game);
      return newGame
    }

    if (!body.isPrivate) {
      const game = new Game();
      game.name = body.name;
      game.maxPlayers = body.maxPlayers;
      game.owner = owner.name;
      game.private = false
      game.currentPlayers = 1;
      game.players = [owner]
      
      const newGame = await this.gameRepository.save(game);
      this.logger.log(`ID ${game.id} game successfully created`)
      this.logger.log(`User named ${owner.name} successfully entered the room created`)
      return newGame
    }
  }


  async joinGame(body: joinGameDto, socket: any) {
    const gameId = body.gameId;
    const game = await this.gameRepository.findOne({
      where: {
        id: gameId
      },
      relations: ['players']
    });

    if (!game) return { error: 'Game not found' };

    if (game.private) {
      if (!body.password) return { error: 'Password required for private game' };

      const checkPassword = await bcrypt.compare(body.password, game.password);
      if (!checkPassword) return { error: 'Incorrect password' };
    }

    const player = await this.playerRepository.findOne({
      where: {
        name: socket.handshake.query.username
      }
    });

    if (!player) return { error: 'Player not found' };

    if (game.currentPlayers >= game.maxPlayers) return { error: 'Game is full' };

    game.players.push(player);
    game.currentPlayers += 1;

    if (game.maxPlayers === game.currentPlayers) {
      game.status = true;
      await this.cardDealing(game);
      this.mainCard(game);
    }

    await this.gameRepository.save(game);
    this.logger.log(`User named ${player.name} successfully logged into room ${game.name}.`)
    return {
      message: 'Successfully joined game',
      user: {
        name: player.name,
        id: player.id
      }
    };
  }
}