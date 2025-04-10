import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.userService.findUserById(+id);
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @Post()
    create(@Body() body: CreateUserDto) {
        return this.userService.createUser(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: CreateUserDto) {
        return this.userService.updateUser(+id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.deleteUser(+id);
    }
}
