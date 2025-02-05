import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginAuthDto {
    @IsString()
    @ApiProperty({
        example: 'marcelomatheus',
        description: 'The nickname of the user',
    })
    nickname: string;

    @ApiProperty({
        example: '123456',
        description: 'The password of the user',
    })
    @IsString()
    password: string;
}
