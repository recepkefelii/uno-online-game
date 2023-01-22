import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Game } from './game.entity';
import { Player } from './player.entity';
import { Card } from './card.entity';

@Entity()
export class Move {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  type: string;

  @ManyToOne(type => Game, game => game.moves)
  game: Game;

  @ManyToOne(type => Player, player => player.moves)
  player: Player;

  @ManyToOne(type => Card, card => card.move)
  card: Card;
}