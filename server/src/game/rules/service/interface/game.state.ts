import { Game } from "src/entities/game.entity";
export interface GameState {
    cardDealing(game:Game) : Promise<void>
}