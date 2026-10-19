import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @Transform(({ value  }) => typeof value === "string" ? value.trim() : value)
    @IsString({message: `Le titre doit etre une chaine de caractères`})
    @IsNotEmpty({message: `Le titre est obligatoire`})
    title: string
}