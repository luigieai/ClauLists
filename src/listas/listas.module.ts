import { Module } from '@nestjs/common';
import { ListasController } from './listas.controller';
import { ListasService } from './listas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListaRepository } from './listas.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListaRepository]),
    AuthModule,
  ],
  controllers: [ListasController],
  providers: [ListasService]
}) 

export class ListasModule {}
