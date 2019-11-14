import { Test } from '@nestjs/testing';
import { ListasService } from '../listas.service';
import { ListaRepository } from '../listas.repository';
import { GetListasFilterDto } from '../dto/get-listas-filter-dto';
import { ListaStatus } from '../lista-status.enum';

const mockUser = { username: 'testUser' }

const mockListaRepository = () => ({
    getListas: jest.fn(),

});

describe('ListaService', () => {
    let listasService;
    let listaRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ListasService,
                {provide: ListaRepository, useFactory: mockListaRepository}
            ]
        }).compile();
        listasService = await module.get<ListasService>(ListasService);
        listaRepository = await module.get<ListaRepository>(ListaRepository);
    });

    describe('getListas', async () => {
        it('Pega todas as listas de um repositório', () => {
            listaRepository.getListas.mockResolvedValue('algumaValor');
            expect(listaRepository.getListas).not.toHaveBeenCalled();

            const filters: GetListasFilterDto = {status: ListaStatus.SOMENTE_LEITURA, search: 'Alguma query'};
            const result = listasService.getListas(filters, mockUser);
            expect(listaRepository.getListas).toHaveBeenCalled();
            expect(result).toEqual('algumaValor');
        });
    });

});