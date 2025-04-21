import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const jwtToken = authHeader.split(' ')[1];
    if (!jwtToken.trim()) return false;

    const payload = await this.validateToken(jwtToken);
    if (!payload) return false;
    return true;
  }

  private async validateToken(token: string): Promise<any> {
    try {
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, 'chetanchikey', { algorithms: ['HS256'] }, (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
      return decoded;
    } catch (error) {
      console.error('JWT validation failed:', error.message);
      return null;
    }
  }
}
