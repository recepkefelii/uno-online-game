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

  @Column({ nullable: true })
  password: string

  @Column({ default: false, nullable: true })
  private: boolean;

  @Column()
  owner: string

  @Column()
  maxPlayers: number;

  @Column()
  currentPlayers: number;

  @Column({ nullable: true, default: false })
  status: boolean

  @OneToMany(type => Player, player => player.game, { cascade: ["remove"] })
  players: Player[];

  @OneToMany(type => Card, card => card.game, { cascade: ["remove"] })
  cards: Card[];

  @OneToMany(type => Move, move => move.game, { cascade: ["remove"] })
  moves: Move[];
}