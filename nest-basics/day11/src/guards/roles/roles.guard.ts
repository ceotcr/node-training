import * as jwt from 'jsonwebtoken';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    console.log("authHeader", authHeader);
    if (!authHeader) return false;
    const token = authHeader.split(' ')[1];
    console.log("token", token);
    if (!token) return false;
    const { role } = jwt.decode(token) as jwt.JwtPayload;
    console.log("role", role);
    return roles.includes(role);
  }
}
