import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsStrongPassword, IsUrl } from "class-validator"

export class CreateUserDto {
    @ApiProperty({
            description: 'Primeiro nome do usuário',
            example: 'Lucas'
        })
    @IsString()
    nickname: string

    @ApiProperty({
        description: 'Primeiro nome do usuário',
        example: 'Lucas'
    })
    @IsString()
    name: string

    @ApiProperty({
        description: 'Senha do usuário',
        example: '123456'
    })
    @IsStrongPassword()
    password: string

    @ApiProperty({
        description: 'Imagem do usuário',
        example: 'https://image.com/image.png'
    })
    @IsUrl()
    image: string
}
