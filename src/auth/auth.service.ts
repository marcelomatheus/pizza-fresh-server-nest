import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, 
        private readonly jwtService: JwtService
    ) {}
  async login(loginAuthDto: LoginAuthDto): Promise<LoginResponseDto> {
    const { nickname, password } = loginAuthDto;
    const user = await this.prisma.user.findUnique({
        where: {
            nickname: nickname
        }
    });
    if (!user) {
        throw new NotFoundException('Usuário ou senha inválidos');
    }
    const isHashValid = await bcrypt.compare(password, user.password);

    if (!isHashValid) {
        throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    delete user.password;

    return {
        token: this.jwtService.sign({ nickname }),
        user
    }
  }
}
