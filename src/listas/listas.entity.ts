import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ListaStatus } from "./lista-status.enum";
import { User } from "../auth/user.entity";

@Entity()
export class Lista extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    status: ListaStatus;

    @ManyToOne(type => User, user => user.listas, {eager:false})
    user: User;

    @Column()
    userId: number;

}