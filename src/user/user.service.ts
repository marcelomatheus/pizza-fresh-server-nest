import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { handleError } from 'src/utils/handle-errors.util';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true
  }
  constructor(private readonly prisma: PrismaService){}
  async findById(id: string): Promise<Partial<User>>{
      const record =  await this.prisma.user.findUnique({
          where: {
              id
          },
          select: this.userSelect
      })
      if(!record) throw new NotFoundException(`O registro com o ID ${id} não foi econtrado`)
      return record;
  }
  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    if(createUserDto.password !== createUserDto.confirmPassword){
        throw new UnauthorizedException('As senhas são diferentes')
    }
    delete createUserDto.confirmPassword
    const user: User = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    }
    return this.prisma.user.create({
        data: user,
        select: this.userSelect
    }).catch(handleError)
  }

  findAll(): Promise<Partial<User>[]> {
    return this.prisma.user.findMany({
      select: this.userSelect
    })
  }

  async findOne(id: string): Promise<Partial<User>> {
    const data = await this.findById(id)
    return data
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    await this.findById(id)
    if(updateUserDto.password){
        if(updateUserDto.password !== updateUserDto.confirmPassword){
            throw new UnauthorizedException('As senhas são diferentes')
        }
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
    }
    delete updateUserDto.confirmPassword
    const data: Partial<User> = {...updateUserDto}
    return this.prisma.user.update({
        data,
        where: {
            id
        }, select: this.userSelect
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
