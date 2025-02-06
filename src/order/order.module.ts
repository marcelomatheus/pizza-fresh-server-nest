import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({
      defaultStrategy: 'jwt',
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    }),],
  
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
