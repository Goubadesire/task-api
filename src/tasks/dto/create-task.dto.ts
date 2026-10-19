import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString({message: `Le titre doit etre une chaine de caractères`})
    @IsNotEmpty({message: `Le titre est obligatoire`})
    title: string
}