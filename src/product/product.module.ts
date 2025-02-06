import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({
      defaultStrategy: 'jwt',
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    }),],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
