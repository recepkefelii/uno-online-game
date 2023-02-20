export interface IGame {
    id: string;
    name: string;
    players: string[];
    owner: string;
    maxPlayers: number;
    currentPlayers: number;
    password?: string;
    isPrivate: boolean;
    status: boolean;
  }