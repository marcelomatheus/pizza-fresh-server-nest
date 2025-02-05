import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, Validate, ValidateNested } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class LoginResponseDto {
    @IsString()
    @ApiProperty({
        example: 'TOKEN_GENERATED',
        description: 'The token that is used to authenticate the user',
    })
    token: string;

    @Type(() => User)
    @ValidateNested()
    @ApiProperty({
        type: User,
        description: 'The user that is logged in',
    })  
    user: User;
}