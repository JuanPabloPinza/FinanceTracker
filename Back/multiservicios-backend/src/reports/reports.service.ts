import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Transaction } from 'src/transactions/transaction.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Transaction)
        private transaccionesRepository: Repository<Transaction>,
      ) {}
    
      async getReportes(): Promise<Transaction[]> {
        return this.transaccionesRepository.find({
          relations: ['registradoPor', 'categoria', 'cliente'],
        });
      }
}
