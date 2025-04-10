import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class VerifyApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
      throw new ForbiddenException("API key is missing or invalid");
    }
    next();
  }
}
