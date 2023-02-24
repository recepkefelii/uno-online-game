import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Game } from './game.entity';
import { Player } from './player.entity';
import { CardColor } from 'src/shared/enum/card.color.enum';
import { CardValue } from 'src/shared/enum/card.value.enum';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isWild: boolean;

  @Column({default: false})
  isMain: boolean

  @Column({ default: false })
  isDrawTwo: boolean;

  @Column({ default: false })
  isReverse: boolean;

  @Column({ default: false })
  isSkip: boolean;

  @Column({ default: false })
  isWildDrawFour: boolean;

  @Column({ type: 'enum', enum: CardColor, nullable: true })
  color: CardColor;

  @Column({ type: 'enum', enum: CardValue, nullable: true })
  value: CardValue;

  @ManyToOne(() => Game, game => game.cards, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  game: Game;

  @ManyToOne(() => Player, player => player.cards, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  player: Player;
}
