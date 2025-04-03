import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { DtoRegisterCategory } from './dto/register-categories.dto';
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post('create')
    async registerCategory(@Body() dtoRegisterCategory:DtoRegisterCategory ) {
        return await this.categoriesService.create(dtoRegisterCategory);
    }
}
