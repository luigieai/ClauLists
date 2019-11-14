import { IsOptional, IsNotEmpty, IsIn } from "class-validator";
import { ListaStatus } from "../lista-status.enum";

export class GetListasFilterDto {
    @IsOptional()
    @IsIn([ListaStatus.ABERTA, ListaStatus.SOMENTE_LEITURA])
    status: ListaStatus;
    
    @IsOptional()
    @IsNotEmpty()
    search: string;
}