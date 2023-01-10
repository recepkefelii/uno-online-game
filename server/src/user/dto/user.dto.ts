import { IsString } from 'class-validator';
import { Player } from 'src/entities/player.entity';

export class userDto {
    @IsString()
    name: any
}