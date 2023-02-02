import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Game } from './game.entity';
import { Player } from './player.entity';
import { Move } from './move.entity';

export enum CardColor {
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
  WILD = 'wild',
}

export enum CardValue {
  ZERO = '0',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  SKIP = 'skip',
  REVERSE = 'reverse',
  DRAW_TWO = 'draw_two',
  WILD = 'wild',
  WILD_DRAW_FOUR = 'wild_draw_four',
}

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CardColor,
  })
  color: CardColor;

  @Column({
    type: 'enum',
    enum: CardValue,
  })
  value: CardValue;

  @ManyToOne(type => Game, game => game.cards,{
    onDelete: "CASCADE", orphanedRowAction: 'delete'
})
  game: Game;

  @ManyToOne(type => Player, player => player.cards,
    {
      onDelete: "CASCADE", orphanedRowAction: 'delete'
  })
  player: Player;

  @ManyToOne(type => Move, move => move.card)
  move: Move;
}
