    import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
    import { Transaction } from "../transactions/transaction.entity"


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

        @Column({ nullable: true })
        refreshToken: string;

        @Column({ enum: ['Admin', 'Colaborador'] })
        rol: 'Admin' | 'Colaborador';

        @OneToMany(() => Transaction, (transaction) => transaction.registradoPor)
        transacciones: Transaction[];
    }
