import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { DtoCreateTransaction } from './dto/create-transaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
export class TransactionsController {
    //Para el controlador necesito crear un controlador de service
    constructor(private transaccionesService: TransactionsService) {}

    @Post()
    async create(@Body() transaccionDto: any, @Request() req) {
      const userId = req.user.userId;
      return this.transaccionesService.create(transaccionDto, userId);
    }
  
    @Get()
    async findAll() {
      return this.transaccionesService.findAll();
    }
}
