import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class LogIpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(req.ip)
    next();
  }
}
