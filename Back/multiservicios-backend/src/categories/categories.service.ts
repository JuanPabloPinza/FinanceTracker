import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    //Me creo una instancia para inyectar la base de datos en base de Categoria
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ){}
    
    
    async create(categoryData: Partial<Category>): Promise<Category>{
        const newCategory = this.categoryRepository.create(categoryData);
        return this.categoryRepository.save(newCategory);
    }


    //   async create(userData: Partial<User>): Promise<User> {
    //     //Primero se genera un bycript
    //     const salt = await bcrypt.genSalt();
    //     userData.password = await bcrypt.hash(userData.password, salt);
    //     const newUser = this.usersRepository.create(userData);
    //     return this.usersRepository.save(newUser);
    //   }
}
