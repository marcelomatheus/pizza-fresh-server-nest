import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-errors.util';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService){}

  async create(createOrderDto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: { connect: { id: createOrderDto.userId } }, 
      table: { connect: { number: createOrderDto.tableNumber } },
      products: {
        createMany: {
          data: createOrderDto.products.map((createOrderProductDto) => ({
            productId: createOrderProductDto.productId,
            quantity: createOrderProductDto.quantity,
            description: createOrderProductDto.description

          }))
        }
      }

    }
    return await this.prisma.order.create({
      data, select: {
        id: true,
        user: {
          select: {
            name: true
          }},
        table: {
          select: {number: true}
        },
        products: {
          select: {
            product: {
              select: {
                name: true,
                price: true
              }
            }
          }
        }
      }
    }).catch(handleError)
  }

  findAll() {
    return this.prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true
          }},
        table: {
          select: {number: true}
        },
        _count: {
          select: {products: true}
        }
      }
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.order.findUnique({
      where: {
        id
      }, select: { 
        id: true,
        user: {
          select: {
            name: true
          }},
        table: {
          select: {number: true}
        },
        products: {
          select: {
            product: {
              select: {
                name: true,
                price: true
              }
            }
          }
        },
      }
    })
    if(!record){
      throw new NotFoundException('Order not found')
    }

    return record;
  }
}
