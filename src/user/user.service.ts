import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { find } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}
  async findById(id: string): Promise<User>{
      const record =  await this.prisma.user.findUnique({
          where: {
              id,
          }
      })
      if(!record) throw new NotFoundException(`O registro com o ID ${id} não foi econtrado`)
      return record;
  }
  create(createUserDto: CreateUserDto) {
    const user: User = {...createUserDto}
    return this.prisma.user.create({
        data: user
    }).catch(this.handleError)
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  findOne(id: string): Promise<User> {
    return this.findById(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findById(id)
    const data: Partial<User> = {...updateUserDto}
    return this.prisma.user.update({
        data,
        where: {
            id
        }
    }).catch(this.handleError)
  }

  async remove(id: string): Promise<void> {
    await this.findById(id)
    await this.prisma.user.delete({
        where: {
            id
        }
    })  
  }

  handleError(error: Error): undefined {
    const messageLines = error.message.split('\n')
    const messageError = messageLines[messageLines.length-1].trim()
    throw new Error(messageError || 'Algum erro ocorreu ao executar a operação')
  }
}
