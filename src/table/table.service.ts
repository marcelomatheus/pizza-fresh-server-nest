import { Injectable } from "@nestjs/common";

@Injectable()
export class TableService{
    create() {
        return 'Criar mesas'
    }
    findAll() {
        return 'Buscar todas as mesas'
    }

}