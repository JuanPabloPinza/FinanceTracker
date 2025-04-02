import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import {Transaction} from "../transactions/transaction.entity"


@Entity()
export class User {
    @PrimaryColumn()
    cedula: number;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    rol: 'Admin' | 'Colaborador';

    // Relación con transacciones (si aplica)
    @OneToMany(() => Transaction, (transaction) => transaction.usuario)
    transacciones: Transaction[];
}
