import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { RequestLoggerMiddleware } from './middlewares/request-logger/request-logger.middleware';
import { AuthorizationMiddleware } from './middlewares/authorization/authorization.middleware';
import { VerifyApiKeyMiddleware } from './middlewares/verify-api-key/verify-api-key.middleware';
import { ConfigModule } from '@nestjs/config';
import { LogIpMiddleware } from './middlewares/log-ip/log-ip.middleware';

@Module({
  imports: [ProductsModule, UsersModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('admin')
      .apply(AuthorizationMiddleware)
      .forRoutes('header')
      .apply(VerifyApiKeyMiddleware)
      .forRoutes({
        method: RequestMethod.GET,
        path: 'reports',
      }).apply(LogIpMiddleware).forRoutes('reports');
  }
}
