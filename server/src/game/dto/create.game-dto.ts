import { IsString, IsNumber, IsBoolean, Length, IsNotEmpty } from 'class-validator';
export class createGameDto {
    @IsString()
    @Length(10, 20)
    name: string
    @IsNumber()
    currentPlayers: number
    @IsNumber()
    maxPlayers: number
    @IsString()
    password: string
    @IsBoolean()
    isPrivate: boolean
    @IsNotEmpty()
    @IsString()
    username: string
}