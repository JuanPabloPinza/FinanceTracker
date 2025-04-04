import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../clients/clients.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientesRepository: Repository<Client>,
  ) {}

  async findOne(cedula: number): Promise<Client> {
    const client = await this.clientesRepository.findOne({ where: { cedula } });
    if (!client) {
      throw new Error(`Client con cedula ${cedula} not found`);
    }
    return client;
  }

  async create(cliente: Partial<Client>): Promise<Client> {
    return this.clientesRepository.save(cliente);
  }
}