import { Injectable } from '@nestjs/common';
import { User, users } from './users';
const logoutLogs = new Map<number, Date>();
@Injectable()
export class UsersService {
    async getUserByEmail(email: string): Promise<User | undefined> {
        return users.find(user => user.email === email);
    }

    addLogoutLog(userId: number): void {
        const now = new Date();
        logoutLogs.set(userId, now);
    }

    getLogoutLog(userId: number): Date | undefined {
        return logoutLogs.get(userId);
    }
}
