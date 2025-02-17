import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { CreateTableDto } from "./dto/create-table.dto";
import { Table } from "./entities/table.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateTableDto } from "./dto/update-table.dto";
import { handleError } from "src/utils/handle-errors.util";

@Injectable()
export class TableService{
   
    constructor(private readonly prisma: PrismaService){}
    async findById(id: string): Promise<Table>{
        const record =  await this.prisma.table.findUnique({
            where: {
                id,
            }
        })
        if(!record) throw new NotFoundException(`O registro com o ID ${id} não foi econtrado`)
        return record;
    }

    async create(createTableDto: CreateTableDto): Promise<Table> {
        const table: Table = {...createTableDto}
 
        return await this.prisma.table.create({
            data: table
        }).catch(handleError)
    }
    findAll(): Promise<Table[]> {
        return this.prisma.table.findMany()
    }
    findOne(id: string): Promise<Table> {
        return this.findById(id)
        
    }
    async delete(id: string) {
        await this.findById(id)
        await this.prisma.table.delete({
            where: {
                id
            }
        })
    }
 
    async update(id: string, updateTableDto: UpdateTableDto): Promise<Table> {
        await this.findById(id)

        const table: Partial<Table> = {...updateTableDto}

        return this.prisma.table.update({
            data: table,
            where: {
                id
            }
        }).catch(handleError)
    }
}