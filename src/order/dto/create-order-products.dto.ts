import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsInt, IsPositive, IsString, IsUUID } from "class-validator";

@ApiTags('order-products')
export class CreateOrderProductDto {
    @IsUUID()
    @ApiProperty({
        example: 'f0edd1cb-c2e0-49ac-849f-5bbde3442928',
        description: 'The product id that is being ordered',
    })
    productId: string;

    @IsPositive()
    @IsInt()
    @ApiProperty({
        example: 2,
        description: 'The quantity of the product being ordered',
    })
    quantity: number;

    @IsString()
    @ApiProperty({
        example: 'Sem cebola',
        description: 'The description of the product being ordered',
    })
    description: string;
}