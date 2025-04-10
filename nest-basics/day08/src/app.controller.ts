import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { JsonParsePipe } from './pipes/json-parse/json-parse.pipe';
import { UserAgent } from './decorators/user-agent/user-agent.decorator';
import { CreateMailAgeDto } from './dto/CreateMailAgeDto';
import { TrimPipe } from './pipes/trim/trim.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("status")
  getStatus(@Query("isActive", ParseBoolPipe) status: boolean) {
    return { status }
  }

  @Get("convert-to-json")
  convertToJson(@Query("string", JsonParsePipe) jsonObject: Object) {
    return { message: "Valid json type", jsonObject }
  }

  @Get("admin")
  getAdmin() {
    return { message: "Hello Admin" }
  }

  @Get("admin/:id")
  getAdminById(@Param("id", ParseIntPipe) id: string) {
    return { message: "Hello Admin", id }
  }

  @Get("header")
  getHeader() {
    return { message: "Header Exists" }
  }

  @Get("user-agent")
  getUserAgent(@UserAgent() userAgent: string) {
    return { message: "User Agent Exists", userAgent }
  }

  @Get("reports")
  getRequiresKey() {
    return { message: "Key Exists" }
  }

  @Post("reports")
  postNoKey() {
    return { message: "No Key Required" }
  }


  @Post("mail-age")
  createMailAge(@Body(new ValidationPipe({ transform: true })) createMailAgeDto: CreateMailAgeDto) {
    return { message: "Valid Mail and Age", createMailAgeDto }
  }
}

/*
@Post("mail-age")
createMailAge(@Body(ValidationPipe) createMailAgeDto: CreateMailAgeDto,
  @Body("email", TrimPipe) trimmedEmail: string,
  @Body("age", ParseIntPipe) parsedAge: number) {
  return { message: "Valid Mail and Age", trimmedEmail, parsedAge }
} 
*/