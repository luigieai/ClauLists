import { Module } from '@nestjs/common';
import { ListasModule } from './listas/listas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ListasModule,
    AuthModule,
  ],
})
export class AppModule {}
