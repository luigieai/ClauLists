import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListaDTO } from './dto/lista-criar-dto';
import { GetListasFilterDto } from './dto/get-listas-filter-dto';
import { ListaRepository } from './listas.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Lista } from './listas.entity';
import { ListaStatus } from './lista-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class ListasService {

    constructor(
        @InjectRepository(ListaRepository)
        private listaRepository : ListaRepository,
    ){}

    async getListas(filterDto: GetListasFilterDto, user: User) : Promise<Lista[]>{
        return this.listaRepository.getListas(filterDto, user);
    }

    async getListaByID(id: number, user: User) : Promise<Lista> {
        return this.listaRepository.getListaByID(id, user);
    }

    async createLista(user: User,createListaDTO: CreateListaDTO) {
        return this.listaRepository.createLista(user, createListaDTO);
    }
    
    async deleteLista(id: number, user: User) : Promise<void> {
        const result = await this.listaRepository.delete( { id, userId: user.id } );

        if(result.affected === 0){
            throw new NotFoundException(`Lista "${id}" nao foi encontrada`);
        }

    }

    async updateStatus(id:number, status: ListaStatus, user: User) : Promise<Lista> {
        let lista : Lista = await this.getListaByID(id, user);
        lista.status = status;
        await lista.save();
        return lista;
    }

}
