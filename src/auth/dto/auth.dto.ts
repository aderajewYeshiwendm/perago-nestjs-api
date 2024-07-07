import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto{
    sub?: string;
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    @IsString()
    password: string
}