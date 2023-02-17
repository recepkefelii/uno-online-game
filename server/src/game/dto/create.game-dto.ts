import { IsString, IsNumber, IsBoolean, Length, IsOptional, IsNotEmpty } from 'class-validator';

export class createGameDto {
    @IsString()
    @Length(4, 12)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    maxPlayers: number;

    @Length(4, 20)
    @IsString()
    @IsOptional()
    password?: string;

    @IsNotEmpty()
    @IsBoolean()
    isPrivate: boolean;
}
