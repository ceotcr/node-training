import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(JSON.stringify({
      method: req.method,
      url: req.url,
      timestamp: new Date().toLocaleString(),
    }));
    next();
  }
}
