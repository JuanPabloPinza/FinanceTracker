// src/transactions/transaction.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipoTransaccion: 'Ingreso' | 'Egreso';

  @Column()
  nombreIngreso: string;
  
  @ManyToOne(() => Category, (category) => category.transacciones, {
    eager: true,
  })
  category: Category; 

  @Column({ nullable: true })
  descripcionIngreso?: string;

  @Column()
  tipoDePago: 'Efectivo' | 'Tarjeta' | 'Transferencia';

  @Column({ type: 'timestamp' })
  fechaPago: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPago: number;

  @ManyToOne(() => User, (user) => user.transacciones)
  usuario: User;

  @Column()
  estado: 'Pagado' | 'Con Deuda';
}
