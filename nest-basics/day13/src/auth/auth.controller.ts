import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.Authenticate(body);
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Req() req) {
        return this.authService.logout(req.user.id);
    }
}
