import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "src/entities/card.entity";
import { Game } from "src/entities/game.entity";
import { Move } from "src/entities/move.entity";
import { Player } from "src/entities/player.entity";
import { Repository } from 'typeorm';
import { GameState } from "./interface/index";
import { CardColor, CardValue } from "src/entities/card.entity";

@Injectable()
export default class GameRules implements GameState {
  constructor(
    @InjectRepository(Game)
    public readonly gameRepository: Repository<Game>,
    @InjectRepository(Player)
    public readonly playerRepository: Repository<Player>,
    @InjectRepository(Card)
    public readonly cardRepository: Repository<Card>,
    @InjectRepository(Move)
    public readonly moveRepository: Repository<Move>
  ) { }
  cardDealing(game: Game): void {
    
    const players = game.players

    const randomCardType = <T>(enumObject: Record<string, T>): T => {
      const enumValues = Object.values(enumObject) as T[];
      const randomIndex = Math.floor(Math.random() * enumValues.length);
      return enumValues[randomIndex];
    };
    
    for (let play of players) {
      const card = new Card()
      card.color = randomCardType(CardColor)
    }

  }

}
