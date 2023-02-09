import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "src/entities/card.entity";
import { Game } from "src/entities/game.entity";
import { Move } from "src/entities/move.entity";
import { Player } from "src/entities/player.entity";
import { Repository } from 'typeorm';
import { GameState, RandomCardType } from "src/game/rules/service/interface";
import { CardColor, CardValue } from "src/entities/card.entity";
import { MainCard } from "src/game/rules/service/interface/main.card-type";

@Injectable()
export default class GameRules implements GameState, RandomCardType, MainCard {
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

  randomCardType = <T>(enumObject: Record<string, T>): T => {
    const enumValues = Object.values(enumObject) as T[];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  };

  async randomPlayer(gameId: number) {
    const game = await this.gameRepository.findOne({
      where: {
        id: gameId,
      },
      relations: {
        players: true
      }
    })

    const randomOnePlayer = Object.values(game.players)[Math.floor(Math.random() * Object.values(game.players).length)]
    randomOnePlayer.currentTurn = true
    await this.playerRepository.save(randomOnePlayer)
    return randomOnePlayer.id
  }


  async cardDealing(game: Game): Promise<void> {

    const players = game.players
    const numberOfCards = 7

    for (let player of players) {
      player.cards = []
      for (let i = 0; i < numberOfCards; ++i) {
        const card = new Card();
        card.color = this.randomCardType(CardColor)
        card.value = this.randomCardType(CardValue)
        card.game = game
        player.cards.push(card)
        card.player = player
        await this.playerRepository.save(player)
        await this.cardRepository.save(card)
      }
    }
  }
  mainCard(game: Game) {
    const card = new Card()
    card.value = this.randomCardType(CardValue)
    card.color = this.randomCardType(CardColor)
    card.game = game
    card.isMain = true
    this.cardRepository.save(card)
  }
}
