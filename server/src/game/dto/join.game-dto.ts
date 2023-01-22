import { IsString } from "class-validator"

export class joinGameDto {
    gameId: number
    playerId: number
    @IsString()
    password: string
    @IsString()
    isPrivate: boolean
}