import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    bio: string;

    @IsNotEmpty()
    userName: string;
}   