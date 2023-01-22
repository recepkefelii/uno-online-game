import { IsString, IsNumber, IsBoolean } from 'class-validator';
export class createGameDto {
    @IsString()
    name: string
    @IsNumber()
    currentPlayers: number
    @IsNumber()
    maxPlayers: number
    @IsString()
    password: string
    @IsBoolean()
    isPrivate: boolean
}