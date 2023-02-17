import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class joinGameDto {
    @IsNotEmpty()
    @IsInt()
    gameId: number

    @Length(4, 10)
    @IsString()
    @IsOptional()
    password: string

    @IsNotEmpty()
    @IsBoolean()
    isPrivate: boolean

    username: string
}
