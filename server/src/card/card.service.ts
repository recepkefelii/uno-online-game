import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "src/entities/card.entity";
import { Game } from "src/entities/game.entity";
import { Player } from "src/entities/player.entity";
import { WsBadRequestException } from "src/exception/ws-exceptions";
import { CardColor } from "src/shared/enum/card.color.enum";
import { CardValue } from "src/shared/enum/card.value.enum";
import { Repository } from "typeorm";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) { }

  private getRandomColor(): CardColor {
    const colors = [CardColor.Red, CardColor.Green, CardColor.Blue, CardColor.Yellow];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  private readonly count = 7

  private getRandomValue(): CardValue {
    const values = [
      CardValue.Zero,
      CardValue.One,
      CardValue.Two,
      CardValue.Three,
      CardValue.Four,
      CardValue.Five,
      CardValue.Six,
      CardValue.Seven,
      CardValue.Eight,
      CardValue.Nine,
    ];
    return values[Math.floor(Math.random() * values.length)];
  }

  async cardDealind(game: Game) {
    await this.createMainCard(game)
    for (const players of game.players) {
      await this.createRandomCards(game, players, this.count)
    }
  }

  public async createRandomCards(game: Game, player: Player, count: number): Promise<Card[]> {
    const cards: Card[] = [];
    for (let i = 0; i < count; i++) {
      const card = new Card();
      card.game = game;
      card.player = player ? player : null
      card.color = this.getRandomColor();
      card.value = this.getRandomValue();
      cards.push(card);
    }
    await this.cardRepository.save(cards);
    return cards;
  }

  public async createMainCard(game: Game, player?: Player): Promise<Card> {
    const card = new Card()
    card.color = this.getRandomColor()
    card.value = this.getRandomValue()
    card.isMain = player ? false : true
    card.game = game
    card.player = player ? player : null
    return await this.cardRepository.save(card)
  }


  public async cardControl(card: Card, mainCard: Card) {
    if (mainCard.color === card.color || mainCard.value === card.value) {
      mainCard.color = card.color
      mainCard.game = card.game
      mainCard.value = card.value
      const newCard = this.cardRepository.save(mainCard)
      return newCard;
    } else {
      throw new WsBadRequestException("This move is against the rules");
    }
  }
}
