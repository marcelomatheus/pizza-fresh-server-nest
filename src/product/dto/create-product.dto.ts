import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUrl } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        description: 'Dados do produto',
        example: 'À moda'
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Molho, calabresa, peperone e cebola'
    })
    @IsString()
    description: string;

    @IsNumber({
        maxDecimalPlaces: 2
    })
    @ApiProperty({
        example: 48.95
    })
    price: number;

    @IsUrl()
    @ApiProperty({
        example: 'https://image.com/image.png'
    })
    image: string;
    
}
