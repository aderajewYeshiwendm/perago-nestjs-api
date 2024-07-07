import { IsNotEmpty, IsString } from "class-validator";

export class CreatePhotoDto{
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
    @IsString()
    filename: string;

}