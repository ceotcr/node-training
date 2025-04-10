import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price: number;

    @IsOptional()
    @IsString({ each: true })
    @MinLength(2, { each: true })
    tags: string[];
}