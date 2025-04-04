import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { DtoRegisterCategory } from './dto/register-categories.dto';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './category.entity';
@Controller('categories')
@UseGuards(AuthGuard('jwt'))
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    async findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(+id);
    }

    @Post()
    async create(@Body() categoria: Partial<Category>) {
        return this.categoriesService.create(categoria);
    }

}
