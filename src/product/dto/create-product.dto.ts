import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({
        description: 'Dados do produto',
        example: 'À moda'
    })
    name: string;
    @ApiProperty({
        example: 'Molho, calabresa, peperone e cebola'
    })
    description: string;
    @ApiProperty({
        example: 48.95
    })
    price: number;
    @ApiProperty({
        example: 'https://image.com/image.png'
    })
    image: string;
    
}
