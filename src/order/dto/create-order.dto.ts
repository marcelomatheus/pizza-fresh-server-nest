import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsInt, IsPositive, IsUUID, ValidateNested } from "class-validator";
import { CreateOrderProductDto } from "./create-order-products.dto";
import { Type } from "class-transformer";

@ApiTags('order')
export class CreateOrderDto {

    @IsUUID()
    @ApiProperty({
        example: '12fdb2ec-727f-4048-abb4-fc7571202fb4',
        description: 'The user id that is making the order'
    })
    userId: string;

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


