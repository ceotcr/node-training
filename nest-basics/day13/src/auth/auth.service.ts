import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import { UsersService } from 'src/users/users.service';
type AuthInput = {
    email: string;
    password: string;
}
type AuthOutput = {
    accessToken: string;
    id: number;
    name: string;
    email: string;
};
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }
    async Authenticate({ email, password }: AuthInput): Promise<AuthOutput | null> {
        if (!email || !password) {
            throw new BadRequestException('Email and password are required');
        }
        const user = await this.usersService.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (user.password !== password) {
            throw new BadRequestException('Invalid password');
        }
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload)
        return { accessToken, id: user.id, name: user.name, email: user.email };
    }

    async logout(userId: number) {
        this.usersService.addLogoutLog(userId);
        return { message: 'Logged out successfully' };
    }

    async getUserFromToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            const logoutLog = this.usersService.getLogoutLog(payload.sub);
            if (logoutLog && logoutLog > new Date(payload.iat * 1000)) {
                return null;
            }
            const user = await this.usersService.getUserByEmail(payload.email);
            if (!user) {
                return null;
            }
            return { id: user.id, name: user.name, email: user.email };
        } catch (error) {
            return null;
        }
    }
}