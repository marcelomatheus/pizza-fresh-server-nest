import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { TableService } from "./table.service";
import { CreateTableDto } from "./dto/create-table.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Table } from "./entities/table.entity";
import { UpdateTableDto } from "./dto/update-table.dto";

@ApiTags('table')
@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}
    @Get()
    @ApiOperation({
        summary: 'List all tables'
    })
    findAll(): Promise<Table[]> {
        return this.tableService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Return a specific table'
    })
    findOne(@Param('id') id: string): Promise<Table> {
        return this.tableService.findOne(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Create a data table'
    })
    create(@Body() createTableDto: CreateTableDto): Promise<Table> {
        return this.tableService.create(createTableDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Remove a table'
    })
    async delete(@Param('id') id:string) {
        await this.tableService.delete(id)
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update a data table'
    })
    update(@Param('id') id:string, @Body() updateTableDto: UpdateTableDto): Promise<Table>{
        return this.tableService.update(id, updateTableDto)
    }
}