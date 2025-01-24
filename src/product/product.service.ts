import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'rxjs';

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
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto
    }).catch(this.handleError)
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

  handleError(error: Error): undefined{
    const errorLines = error.message.split('\n')
    const errorMessage = errorLines[errorLines[errorLines.length-1]].split()
    throw new UnprocessableEntityException(errorMessage)
  }
}
