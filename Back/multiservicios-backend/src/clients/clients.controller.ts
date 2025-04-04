import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Client } from './clients.entity';
import { ClientsService } from './clients.service';

@Controller('clients')
@UseGuards(AuthGuard('jwt'))
export class ClientsController {
    constructor(private clientesService: ClientsService) { }

    @Post()
    async create(@Body() cliente: Partial<Client>) {
        return this.clientesService.create(cliente);
    }

}
