import { IsString, Length, IsNotEmpty } from 'class-validator';

export class userDto {
    @IsNotEmpty()
    @Length(3, 20)
    @IsString()
    name: string
}