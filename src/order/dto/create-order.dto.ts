import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsInt, IsPositive, IsUUID, ValidateNested } from "class-validator";
import { CreateOrderProductDto } from "./create-order-products.dto";
import { Type } from "class-transformer";

@ApiTags('order')
export class CreateOrderDto {
    @ApiProperty({
        example: 1,
        description: 'The table number that the order is being made',
    })
    @IsInt()
    @IsPositive()
    tableNumber: number;

    @ValidateNested({ each: true })
    @Type(() => CreateOrderProductDto)
    @ApiProperty({
        type: [CreateOrderProductDto],
        description: 'The products that are being ordered',
    })
    products: CreateOrderProductDto[];
}


