import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({
      defaultStrategy: 'jwt',
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
