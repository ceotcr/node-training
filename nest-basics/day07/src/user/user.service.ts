import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
@Injectable()
export class UserService {
    private users = new Map<number, { id: number; name: string; email: string; password: string }>();
    private idCounter = 1;

    createUser(data: CreateUserDto) {
        const existingUser = Array.from(this.users.values()).find(user => user.email === data.email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        const user = { id: this.idCounter++, name: data.name, email: data.email, password: data.password };
        this.users.set(user.id, user);
        return user;
    }

    findUserById(id: number) {
        const user = this.users.get(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    getAllUsers() {
        return Array.from(this.users.values());
    }
    updateUser(id: number, data: UpdateUserDto) {
        const user = this.users.get(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const existingUser = Array.from(this.users.values()).find(user => user.email === data.email && user.id !== id);
        if (existingUser) {
            throw new ConflictException('Email already in use by another user');
        }
        this.users.set(id, { ...user, ...data });
        return this.users.get(id);
    }
    deleteUser(id: number) {
        const user = this.users.get(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        this.users.delete(id);
        return user;
    }
}
