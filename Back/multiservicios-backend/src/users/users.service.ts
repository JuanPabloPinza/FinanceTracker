import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ?? undefined;
  }

  async findOneById(cedula: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: {cedula} });
    return user ?? undefined;
  }

  async create(user: Partial<User>): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return this.usersRepository.save(user);
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    await this.usersRepository.update(id, { refreshToken });
  }
}