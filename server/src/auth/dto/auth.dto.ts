import { IsNotEmpty, IsString, Length } from "class-validator"

export class AuthDto{
    @IsString()
    @IsNotEmpty()
    @Length(4, 12)
    name: string

    @IsNotEmpty()
    @Length(4, 20)
    password : string
}