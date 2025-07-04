import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new UnauthorizedException('No token');

    const token = authHeader.split(' ')[1];
    try {
      const secret = this.configService.getOrThrow<string>('JWT_SECRET'); 
      const payload = jwt.verify(token, secret);
      req['user'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
