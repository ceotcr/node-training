import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth-guard/auth-guard.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { TransformInterceptor } from './interceptors/transform.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @UseGuards(AuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('admin')
  @UseInterceptors(TransformInterceptor)
  getAdminData() {
    return 'Welcome Admin!';
  }

}
