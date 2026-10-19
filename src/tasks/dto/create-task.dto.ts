import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString({message: `Le titre doit etre une chaine de caractères`})
    @IsNotEmpty({message: `Le tritre est obligatoire`})
    title: string
}