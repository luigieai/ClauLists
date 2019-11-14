import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { ListaStatus } from "../lista-status.enum";

export class ListaStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        ListaStatus.ABERTA,
        ListaStatus.APAGADA,
        ListaStatus.SOMENTE_LEITURA
    ]
    
    transform(value: any) {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" nao e um status valido`);
        }
        return value;
    }
    private isStatusValid(status: any) {
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}