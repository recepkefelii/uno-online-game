import { IsString, IsNumber } from 'class-validator';
export class createGameDto {
    @IsString()
    name: string
    @IsNumber()
    currentPlayers: number
    @IsNumber()
    maxPlayers: number
}