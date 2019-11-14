import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Lista } from "../listas/listas.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Lista, lista => lista.user, {eager: true})
    listas: Lista[];

    async validatePassword(password: string) : Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}