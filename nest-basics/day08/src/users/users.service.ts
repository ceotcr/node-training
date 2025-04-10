import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    users: { id: number, name: string, userName: string }[] = []
    idCounter = 0

    getUsers() {
        return this.users
    }

    createUser(name: string, userName: string) {
        const user = { id: this.idCounter, name, userName }
        this.users.push(user)
        this.idCounter++
        return user
    }

    getUserById(id: number) {
        return this.users.find(user => user.id === id)
    }
}
