import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Player } from './player.entity';
import { Card } from './card.entity';
import { Move } from './move.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  maxPlayers: number;

  @Column()
  currentPlayers: number;

  @OneToMany(type => Player, player => player.game)
  players: Player[];

  @OneToMany(type => Card, card => card.game)
  cards: Card[];

  @OneToMany(type => Move, move => move.game)
  moves: Move[];
}