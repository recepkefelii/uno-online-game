import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Player } from './player.entity';
import { Game } from './game.entity';

@Entity()
export class Turn {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, { eager: true })
  player: Player;

  @ManyToOne(() => Game, { eager: true })
  game: Game;

  @Column({ default: 1 })
  round: number;
}
