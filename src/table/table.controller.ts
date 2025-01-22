import { Controller, Get } from "@nestjs/common";

@Controller('table')
export class TableController {
    @Get()
    findAll() {
        return 'Buscar Todas as mesas';
    }
}