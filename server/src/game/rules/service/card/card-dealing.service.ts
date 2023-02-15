import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card, MainCardValue } from "src/entities/card.entity";
import { Game } from "src/entities/game.entity";
import { Move } from "src/entities/move.entity";
import { Player } from "src/entities/player.entity";
import { Repository } from 'typeorm';
import { GameState, RandomCardType } from "src/game/rules/service/interface";
import { CardColor, CardValue } from "src/entities/card.entity";
import { MainCard } from "src/game/rules/service/interface/main.card-type";
import { WsException } from "@nestjs/websockets";
import * as _ from 'lodash';
@Injectable()
export default class GameRules implements GameState, RandomCardType, MainCard {
  logger: Logger

  constructor(
    @InjectRepository(Game)
    public readonly gameRepository: Repository<Game>,
    @InjectRepository(Player)
    public readonly playerRepository: Repository<Player>,
    @InjectRepository(Card)
    public readonly cardRepository: Repository<Card>,
    @InjectRepository(Move)
    public readonly moveRepository: Repository<Move>,
  ) {
    this.logger = new Logger(GameRules.name)
  }


  randomCardType = <T>(enumObject: Record<string, T>): T => {
    const enumValues = Object.values(enumObject) as T[];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  };

  async cardControl(card: Card, mainCard: Card) {
    if (mainCard.color === card.color || mainCard.value === card.value) {
      card.move = mainCard.move
      card.player = mainCard.player
      card.game = mainCard.game
      mainCard = card;
      this.logger.verbose(`Card check successful, Card: Id ${card.id} Color ${card.color} Value ${card.value} `)
      return mainCard;
    } else {
      this.logger.error('A Card was played that did not comply with the rules of the game')
      throw new WsException("This move is against the rules");
    }
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
      this.logger.log(`The cards of the game with id ${game.id} were dealing`)
    }
  }
  mainCard(game: Game) {
    const card = new Card()
    card.value = this.randomCardType(MainCardValue)
    card.color = this.randomCardType(CardColor)
    card.game = game
    card.isMain = true
    this.cardRepository.save(card)
    this.logger.log(`The main cart of the game with id ${game.id} has been created`)
  }


  async newGenerateCard(gameId: number, username: string) {

    const game = await this.gameRepository.findOne({
      where: {
        id: gameId
      }
    })

    const player = await this.playerRepository.findOne(
      {
        where: {
          name: username
        }
      }
    )

    const card = new Card()
    card.color = this.randomCardType(CardColor)
    card.value = this.randomCardType(CardValue)
    card.game = game
    card.player = player
    const generateCard = this.cardRepository.save(card)
    return generateCard
  }
}
