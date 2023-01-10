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
  ) {}

  async createGame(body: createGameDto) {
    const game = new Game();
    game.name = body.name;
    game.maxPlayers = body.maxPlayers;
    game.currentPlayers = 0;

    return this.gameRepository.save(game);
  }

  async joinGame(body:joinGameDto){

  }
}