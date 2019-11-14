import { IsNotEmpty } from 'class-validator';

export class CreateListaDTO {
    @IsNotEmpty()
    titulo: string;

    @IsNotEmpty()
    descricao: string;

}