import { IsString, Length } from "class-validator"

export class joinGameDto {
    gameId: number
    playerId: number
    @Length(4, 20)
    @IsString()
    password: string
    @IsString()
    isPrivate: boolean
}
