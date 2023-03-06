import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    @Length(4, 12)
    name: string

    @IsNotEmpty()
    @Length(4, 20)
    password: string
}

export class UpdateDto {
    @IsString()
    @IsNotEmpty()
    @Length(4, 12)
    @IsOptional()
    name: string

    @IsOptional()
    @IsNotEmpty()
    @Length(4, 20)
    password: string
}