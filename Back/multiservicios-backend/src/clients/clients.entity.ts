import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class Client {
  @PrimaryColumn()
  cedula: number;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  direccion: string;

  @Column({ nullable: true })
  telefonoConvencional: number;

  @Column({ nullable: true })
  telefonoCelular: number;

  @OneToMany(() => Transaction, (transaction) => transaction.cliente)
  transacciones: Transaction[];
}