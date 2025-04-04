import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriasRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriasRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriasRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return category;
  }

  async create(categoria: Partial<Category>): Promise<Category> {
    return this.categoriasRepository.save(categoria);
  }
}