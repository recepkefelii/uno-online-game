import { Socket } from "socket.io"

export class GameSocket extends Socket {
    gameId: number
}