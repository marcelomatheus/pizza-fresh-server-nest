import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsInt, IsPositive, IsUUID } from "class-validator";

@ApiTags('order')
export class CreateOrderDto {

    @IsUUID()
    @ApiProperty({
        example: 'adf4-5f4a-4f5a-4f5a',
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

    @ApiProperty({
        example: [
            {
                productId: 'adf4-5f4a-4f5a-4f5a'
            }
        ],
        description: 'The products that are being ordered',
        required: true
    })
    @IsUUID(undefined, { each: true })
    products: string[];
}

