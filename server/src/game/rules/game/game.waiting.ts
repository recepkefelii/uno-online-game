import { Injectable } from "@nestjs/common";
import IGameState from "../interface/game.rules-interface";


@Injectable()
class WaitingGame implements IGameState {
    start(): void {
        throw new Error("Method not implemented.");
    }
    playCard(player: any, card: string): void {
        throw new Error("Method not implemented.");
    }
    drawCard(player: any): void {
        throw new Error("Method not implemented.");
    }
    sayUno(player: any): void {
        throw new Error("Method not implemented.");
    }
    checkForWinner(): void {
        throw new Error("Method not implemented.");
    }
    checkForPenalty(): void {
        throw new Error("Method not implemented.");
    }
    checkForReverse(): void {
        throw new Error("Method not implemented.");
    }
    checkForSkip(): void {
        throw new Error("Method not implemented.");
    }
    checkForDraw(): void {
        throw new Error("Method not implemented.");
    }
    checkForWild(): void {
        throw new Error("Method not implemented.");
    }
    
}