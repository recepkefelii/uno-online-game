import { IsBoolean, IsInt, IsNotEmpty, IsString, Length } from "class-validator"

export class joinGameDto {
    @IsNotEmpty()
    @IsInt()
    gameId: number

    @Length(4, 20)
    @IsString()
    password: string

    @IsNotEmpty()
    @IsBoolean()
    isPrivate: boolean
    
    username: string
}
