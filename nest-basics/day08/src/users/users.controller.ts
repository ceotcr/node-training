import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { TrimPipe } from 'src/pipes/trim/trim.pipe';
import { ToUpperCasePipe } from 'src/pipes/to-upper-case/to-upper-case.pipe';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }

    @Get("/:id")
    getUserById(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.getUserById(id)
    }

    @Post()
    createUser(
        @Body('name', new TrimPipe()) name: string,
        @Body('userName', new ToUpperCasePipe()) userName: string
    ) {
        return this.usersService.createUser(name, userName)
    }
}
