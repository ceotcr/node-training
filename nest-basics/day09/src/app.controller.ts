import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { ResponseTransformerInterceptor } from './response-transformer/response-transformer.interceptor';

@UseInterceptors(LoggerInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @UseInterceptors(ResponseTransformerInterceptor)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}