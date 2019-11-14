import { Repository, EntityRepository } from "typeorm";
import { Lista } from "./listas.entity";
import { CreateListaDTO } from "./dto/lista-criar-dto";
import { ListaStatus } from "./lista-status.enum";
import { NotFoundException, Logger, InternalServerErrorException } from "@nestjs/common";
import { GetListasFilterDto } from "./dto/get-listas-filter-dto";
import { User } from "../auth/user.entity";

@EntityRepository(Lista)
export class ListaRepository extends Repository<Lista> {
    
    private logger = new Logger('ListaRepository');

    async getListas(filterDto: GetListasFilterDto, user: User) : Promise<Lista[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('lista');

        query.where('lista.userId = :userId', {userId: user.id});

        if(status) {
            query.andWhere('lista.status = :status', {status});
        }

        if(search) {
            query.andWhere('(lista.titulo LIKE :search OR lista.descricao LIKE :search)', {search: `%${search}%`});
        }

        try {
            const listas = await query.getMany();
            return listas;
        } catch (error) {
            this.logger.error(`Erro ao pegar listas para o usuario: "${user.username}, DTO: ${JSON.stringify(filterDto)}"`, error.stack);
            throw new InternalServerErrorException();
        }

    }

    async getListaByID(id: number, user: User) : Promise<Lista>{
        const found = await this.findOne({ where: { id, userId: user.id } });

        if(!found) {
            throw new NotFoundException(`Lista "${id}" nao foi encontrada`);
        }

        return found;
    }

    async createLista(user: User ,createListaDTO: CreateListaDTO) : Promise<Lista> {
        const { titulo, descricao } = createListaDTO;
        const lista = new Lista();
        lista.titulo = titulo;
        lista.descricao = descricao;
        lista.status = ListaStatus.ABERTA;
        lista.user = user;

        try {
            await lista.save();
        }catch(error){
            this.logger.error(`Erro ao criar lista para o usuario ${user.username}. Data: ${createListaDTO}`, error.stack);
            throw new InternalServerErrorException();
        }

        delete lista.user; //para não retornar o usuario inteiro na query

        return lista;
    }
}