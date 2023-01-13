import { Injectable } from '@nestjs/common';
import { createGameDto } from './dto/create.game-dto';
import { joinGameDto } from './dto/join.game-dto';
import { Game } from '../entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from 'src/entities/player.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>
  ) { }

  async createGame(body: createGameDto,ownerPlayer:any) {
    const owner = await this.playerRepository.findOne({
      where: {
        name: ownerPlayer
      }
    })
    const game = new Game();
    game.name = body.name;
    game.maxPlayers = body.maxPlayers;
    game.currentPlayers = 1;
    game.players = [owner]
    await this.gameRepository.save(game);
    
    

    return this.gameRepository.find()
  }

  async joinGame(body: joinGameDto,username:any) {
    const gameId = body.gameId
    const game = await this.gameRepository.findOne({
      where: {
        id: gameId
      },
      relations: ['players']
    })

    const findByUsername = await this.playerRepository.findOne(
      {
        where: {
          name: username.handshake.query.username
        }
      }
    )
    
    const player = await this.playerRepository.findOne({
      where: {
        id:findByUsername.id
      }
    });
    

    if (!player) {
      return { error: 'Player not found' };
    }

    if (!game) {
      return {error: 'Game not found'}
    }

    if (game.currentPlayers >= game.maxPlayers) {
      return { error: 'Game is full' };
    }
    
    game.players.push(player)
    game.currentPlayers += 1;

   const currentGame =  await this.gameRepository.save(game)
    
    return { message: 'Successfully joined game' };
  }
}