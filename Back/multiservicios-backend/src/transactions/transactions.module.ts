import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './transaction.entity';
import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';
import { Client } from 'src/clients/clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction ,User, Category, Client])],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
