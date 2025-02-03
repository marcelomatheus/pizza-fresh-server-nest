import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-errors.util';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService){}
  async findById(id: string){
    const record = await this.prisma.product.findUnique({
      where: {
        id
      }
    })
    if(!record) throw new NotFoundException(`O registro com ID ${id} não foi encontrado`)
    return record
  }
  async create(createProductDto: CreateProductDto) {
      const data = {...createProductDto}
      return await this.prisma.product.create({
        data
      }).catch(handleError);
  }

  findAll() {
    return this.prisma.product.findMany()
  }

  async findOne(id: string) {
    return await this.findById(id)
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findById(id)
    return this.prisma.product.update({
      where: {
        id
      },
      data: updateProductDto
    })
  }

  async delete(id: string): Promise<void> {
    await this.findById(id)
    await this.prisma.product.delete({
      where: {
        id
      }
    })
  }
}
