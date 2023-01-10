import { IsString,IsNumber } from 'class-validator';
export class createGameDto {
    @IsString()
    name:string
    @IsString()
    created: string
    @IsNumber()
    currentPlayers: number
    @IsNumber()
    maxPlayers: number
}