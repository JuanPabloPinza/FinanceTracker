// src/categories/category.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion?: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transacciones: Transaction[];
}
