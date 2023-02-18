import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Game } from './game.entity';
import { Player } from './player.entity';


@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  isMain: boolean

  @Column()
  color: string;

  @Column()
  number: number;

  @Column()
  symbol: string;

  @Column()
  type: string;

  @ManyToOne(type => Game, game => game.cards, {
    onDelete: "CASCADE", orphanedRowAction: 'delete'
  })
  game: Game;

  @ManyToOne(type => Player, player => player.cards,
    {
      onDelete: "CASCADE", orphanedRowAction: 'delete'
    })
  player: Player;
}
