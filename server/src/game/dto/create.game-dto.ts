import { IsString, IsNumber, IsBoolean, Length, IsNotEmpty } from 'class-validator';
export class createGameDto {
    @IsString()
    @Length(10, 20)
    name: string

    @IsNotEmpty()
    @IsNumber()
    maxPlayers: number

    @Length(4, 20)
    @IsString()
    password: string

    @IsNotEmpty()
    @IsBoolean()
    isPrivate: boolean

    @IsNotEmpty()
    @IsString()
    username: string
}