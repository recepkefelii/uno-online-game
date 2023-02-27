import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Player } from './player.entity';
import { Card } from './card.entity';
import { Turn } from './turn.entity';

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
  maxPlayers: 2 | 3 | 4;

  @Column()
  currentPlayers: number;

  @Column({ nullable: true, default: false })
  status: boolean

  @OneToMany(type => Player, player => player.game, { cascade: ["remove"] })
  players: Player[];

  @OneToMany(type => Card, card => card.game, { cascade: ["remove"] })
  cards: Card[];

  @OneToMany(type => Turn, turn => turn.game, { cascade: ["remove"] })
  turns: Turn[];
}