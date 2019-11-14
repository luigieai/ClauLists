import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { ListasService } from './listas.service';
import { CreateListaDTO } from './dto/lista-criar-dto';
import { GetListasFilterDto } from './dto/get-listas-filter-dto';
import { ListaStatusValidationPipe } from './pipes/lista-status-validation';
import { Lista } from './listas.entity';
import { ListaStatus } from './lista-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';

@Controller('listas')
@UseGuards(AuthGuard())
export class ListasController {

    private logger = new Logger('ListasController');

    constructor(private listService: ListasService) {}
    @Get()
    getListas(
        @Query(ValidationPipe) filterDto: GetListasFilterDto,
        @GetUser() user: User
        ) : Promise<Lista[]> {
        this.logger.verbose(`User "${user.username}" pegando todas as listas. ${JSON.stringify(filterDto)}`);
        return this.listService.getListas(filterDto, user);
    }

    @Get('/:id')
    getListaByID(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ) : Promise<Lista> {
        this.logger.verbose(`User "${user.username}" pegando a lista de ID: ${id}`);
        return this.listService.getListaByID(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createLista(
        @Body() createListaDTO: CreateListaDTO,
        @GetUser() user: User,
    ) : Promise<Lista> {
        this.logger.verbose(`User "${user.username}" criando uma lista. ${JSON.stringify(createListaDTO)}`);
        return this.listService.createLista(user, createListaDTO);
    }

    @Delete('/:id')
    deleteLista(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) : Promise<void> {
        this.logger.verbose(`User "${user.username}" deletando a lista de ID: ${id}`);
        return this.listService.deleteLista(id, user);
    }


     @Patch('/:id/status')
     updateListaStatus(
         @Param('id', ParseIntPipe) id: number, 
         @Body('status', ListaStatusValidationPipe) status: ListaStatus,
         @GetUser() user: User,
     ) : Promise<Lista> {
        this.logger.verbose(`User "${user.username}" mudando o status da lista de ID: ${id} para ${status}`);
         return this.listService.updateStatus(id, status, user);
     }

}
