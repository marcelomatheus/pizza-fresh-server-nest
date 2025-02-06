import { Module } from "@nestjs/common";
import { TableController } from "./table.controller";
import { TableService } from "./table.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [PrismaModule, PassportModule.register({
        defaultStrategy: 'jwt',
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET,
      }),],
    controllers: [TableController],
    providers: [TableService],
})
export class TableModule {}