import { Injectable } from '@nestjs/common';
import { User, users } from './users';

@Injectable()
export class UsersService {
    async getUserByEmail(email: string): Promise<User | undefined> {
        return users.find(user => user.email === email);
    }
}
