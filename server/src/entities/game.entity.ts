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
  password: string

  @Column({default: false,nullable: true})
  private: boolean;

  @Column()
  owner: string

  @Column()
  maxPlayers: number;

  @Column()
  currentPlayers: number;

  @OneToMany(type => Player, player => player.game, { cascade: true, })
  players: Player[];

  @OneToMany(type => Card, card => card.game, { cascade: true })
  cards: Card[];

  @OneToMany(type => Move, move => move.game, { cascade: true })
  moves: Move[];
}
