import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Client } from '../clients/clients.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipoTransaccion: 'Ingreso' | 'Egreso';

  @Column()
  nombreIngreso: string;
  //TO-DO: Cambiar a nombreTransaccion
  
  @ManyToOne(() => Category, (category) => category.transacciones, {
    eager: true,
  })
  category: Category; 

  @ManyToOne(() => User, (user) => user.transacciones)
  @JoinColumn()
  registradoPor: User;

  @Column({ nullable: true })
  descripcionIngreso?: string;

  @Column()
  tipoDePago: 'Efectivo' | 'Tarjeta' | 'Transferencia';

  @Column()
  fechaPago: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPago: number;

  @Column()
  estado: 'Pagado' | 'Con Deuda';

  // Nueva relación con Client
  @ManyToOne(() => Client, (client) => client.transacciones, { nullable: true })
  @JoinColumn()
  cliente: Client;

  // Eliminamos esta relación si no es necesaria
  // @ManyToOne(() => User, (user) => user.transacciones, { nullable: true })
  // @JoinColumn()
  // usuario: User;
}