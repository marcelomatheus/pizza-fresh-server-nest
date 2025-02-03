import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { find } from 'rxjs';
import { handleError } from 'src/utils/handle-errors.util';

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
    delete createUserDto.confirmPassword
    const user: User = {...createUserDto}
    return this.prisma.user.create({
        data: user
    }).catch(handleError)
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  findOne(id: string): Promise<User> {
    return this.findById(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findById(id)
    delete updateUserDto.confirmPassword
    const data: Partial<User> = {...updateUserDto}
    return this.prisma.user.update({
        data,
        where: {
            id
        }
    }).catch(handleError)
  }

  async remove(id: string): Promise<void> {
    await this.findById(id)
    await this.prisma.user.delete({
        where: {
            id
        }
    })  
  }
}
