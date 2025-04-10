import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateMailAgeDto {
    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value.trim())
    email: string;

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    age: number;
}