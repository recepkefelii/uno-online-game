import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Game } from './game.entity';
import { Card } from './card.entity';
import { Turn } from './turn.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, })
  hash: string

  @ManyToOne(type => Game, game => game.players)
  game: Game;

  @OneToMany(type => Card, card => card.player,)
  cards: Card[];


  @ManyToOne(type => Turn, turn => turn.player,)
  turn: Turn[];
}