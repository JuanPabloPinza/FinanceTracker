import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Category } from 'src/categories/category.entity';
import { DtoCreateTransaction } from './dto/create-transaction.dto';
import { User } from 'src/users/user.entity';
import { Client } from 'src/clients/clients.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transaccionesRepository: Repository<Transaction>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Category)
    private categoriasRepository: Repository<Category>,
    @InjectRepository(Client)
    private clientesRepository: Repository<Client>,
  ) {}

  async create(transaccionDto: DtoCreateTransaction, userId: number): Promise<Transaction> {
    const user = await this.usersRepository.findOne({ where: { cedula: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    let categoria: Category | undefined;
    if (transaccionDto.categoriaId) {
      categoria = (await this.categoriasRepository.findOne({
        where: { id: transaccionDto.categoriaId },
      })) ?? undefined;
      if (!categoria) throw new NotFoundException('Categoría no encontrada');
    }

    let cliente: Client | undefined;
    if (transaccionDto.clienteId) {
      cliente = (await this.clientesRepository.findOne({
        where: { cedula: transaccionDto.clienteId },
      })) ?? undefined;
      if (!cliente) throw new NotFoundException('Cliente no encontrado');
    }

    const transaccion = this.transaccionesRepository.create({
      ...transaccionDto,
      registradoPor: user,
      category: categoria, // Usamos "category" para que coincida con la entidad
      cliente,
    });

    const savedTransaction = await this.transaccionesRepository.save(transaccion);
    return savedTransaction;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transaccionesRepository.find({
      relations: ['registradoPor', 'category', 'cliente'], // Ajustamos las relaciones
    });
  }
}