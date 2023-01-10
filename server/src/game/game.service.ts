import { Injectable } from '@nestjs/common';
import { gameDto } from './dto/create.game-dto';
import { Game } from '../entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async createGame(body: gameDto) {
    const game = new Game();
    game.name = body.name;
    game.maxPlayers = body.maxPlayers;
    game.currentPlayers = 0;

    return this.gameRepository.save(game);
  }
}