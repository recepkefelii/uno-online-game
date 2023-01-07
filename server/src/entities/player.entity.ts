import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Game } from './game.entity';
import { Card } from './card.entity';
import { Move } from './move.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Game, game => game.players)
  game: Game;

  @OneToMany(type => Card, card => card.player)
  cards: Card[];

  @OneToMany(type => Move, move => move.player)
  moves: Move[];
}