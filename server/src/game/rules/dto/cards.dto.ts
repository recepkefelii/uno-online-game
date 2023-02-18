import { IsBoolean, IsEmpty, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CardId {
    @IsInt()
    @IsNotEmpty()
    id: number
}


export class GetCards {
    @IsBoolean()
    @IsEmpty()
    isMain: boolean
}