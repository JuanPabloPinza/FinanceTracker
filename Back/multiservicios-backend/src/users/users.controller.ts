import { Body, Controller, Post } from '@nestjs/common';
import { DtoRegisterUser } from './dto/register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    //Inicializo un constructor de mi servicio para poder usarlo
    constructor(private readonly userService:UsersService){
    }
    @Post('register')
    async registerUser(@Body() dtoRegisterUser:DtoRegisterUser){
        return this.userService.create(dtoRegisterUser);
    }
}
