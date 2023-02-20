import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class joinGameDto {
    @IsNotEmpty()
    @IsString()
    gameId: string

    @Length(4, 10)
    @IsString()
    @IsOptional()
    password: string

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    isPrivate: boolean
}
