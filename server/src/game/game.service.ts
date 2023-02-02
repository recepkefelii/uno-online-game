import { Injectable } from '@nestjs/common';
import { createGameDto } from './dto/create.game-dto';
import { joinGameDto } from './dto/join.game-dto';
import { Game } from '../entities/game.entity';
import * as bcrypt from "bcrypt";
import GameRules from './rules/card-dealing.service';

@Injectable()
export class GameService extends GameRules {
  async createGame(body: createGameDto, ownerPlayer: any) {
    const owner = await this.playerRepository.findOne({
      where: {
        name: ownerPlayer
      }
    })
    const salt = 10

    const passwordHash = await bcrypt.hash(body.password, salt)

    if (body.isPrivate) {
      const game = new Game();
      game.name = body.name;
      game.maxPlayers = body.maxPlayers;
      game.password = passwordHash;
      game.owner = owner.name;
      game.private = true
      game.currentPlayers = 1;
      game.players = [owner]

      await this.gameRepository.save(game);
      return this.gameRepository.find()
    }

    if (!body.isPrivate) {
      const game = new Game();

      game.name = body.name;
      game.maxPlayers = body.maxPlayers;
      game.password = passwordHash;
      game.owner = owner.name;
      game.private = false
      game.currentPlayers = 1;
      game.players = [owner]

      await this.gameRepository.save(game);
      return this.gameRepository.find()
    }
  }


  async joinGame(body: joinGameDto, socket: any) {
    const gameId = body.gameId
    const game = await this.gameRepository.findOne({
      where: {
        id: gameId
      },
      relations: ['players']
    })
    if (game.private) {
      const checkPassword = await bcrypt.compare(body.password, game.password)
      if (!checkPassword) {
        return { error: "deneme" }
      }
      const findByUsername = await this.playerRepository.findOne(
        {
          where: {
            name: socket.handshake.query.username
          }
        }
      )

      const player = await this.playerRepository.findOne({
        where: {
          id: findByUsername.id
        }
      });


      if (!player) return {
        error: 'Player not found'
      };

      if (!game) return { error: 'Game not found' }


      if (game.currentPlayers >= game.maxPlayers) return { error: 'Game is full' };


      game.players.push(player)
      game.currentPlayers += 1;

      if (game.maxPlayers === game.currentPlayers) {
        game.status = true
        await this.cardDealing(game)
        this.mainCard(game)
      }

      await this.gameRepository.save(game)

      return {
        message: 'Successfully joined game',
        "user": {
          name: player.name,
          id: player.id
        }
      };
    }
  }
}