import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}
  async login(loginAuthDto: LoginAuthDto): Promise<LoginResponseDto> {
    const { nickname, password } = loginAuthDto;
    const user = await this.prisma.user.findUnique({
        where: {
            nickname: nickname
        }
    });
    if (!user) {
        throw new NotFoundException('User not found');
    }
    const auth = await bcrypt.compare(password, user.password);
    return {
        token: 'token',
        user
    }
  }
}
