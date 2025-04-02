// src/transactions/transaction.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Categoria } from '../categories/category.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Generado automáticamente

  @Column()
  tipoTransaccion: 'Ingreso' | 'Egreso';

  @Column()
  nombreIngreso: string;
  
  @ManyToOne(() => Categoria, (categoria) => categoria.transacciones, {
    eager: true, // Opcional, si quieres que la categoría siempre se cargue
  })

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
