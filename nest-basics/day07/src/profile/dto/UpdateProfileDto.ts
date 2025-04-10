import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateProfileDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    bio: string;

    @IsNotEmpty()
    userName: string;
}   