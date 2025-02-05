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
        description: 'Nome do usuário',
        example: 'Lucas Nunes Alves'
    })
    @IsString()
    name: string

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'Makdsjbd51a4@'
    })
    @IsStrongPassword()
    password: string

    @ApiProperty({
        description: 'Confirmação da senha do usuário',
        example: 'Makdsjbd51a4@'
    })
    @IsStrongPassword()
    confirmPassword: string


    @ApiProperty({
        description: 'Imagem do usuário',
        example: 'https://image.com/image.png'
    })
    @IsUrl()
    image: string
}
