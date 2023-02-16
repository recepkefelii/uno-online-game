import { IsBoolean, IsEmpty, IsInt, IsNotEmpty, IsString } from "class-validator"
import { CardColor, CardValue } from "src/entities/card.entity"

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