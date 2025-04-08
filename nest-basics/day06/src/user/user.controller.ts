import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get("/:name")
    getUser(@Param("name") name: string): string {
        return `Hello ${name}`;
    }
}
