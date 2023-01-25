export default interface IGameState {
    start(): void;
    playCard(player: any, card: string): void;
    drawCard(player: any): void;
    sayUno(player: any): void;
    checkForWinner(): void;
    checkForPenalty(): void;
    checkForReverse(): void;
    checkForSkip(): void;
    checkForDraw(): void;
    checkForWild(): void;
  }