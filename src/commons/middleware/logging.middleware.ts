import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('###### MIDDLEWARE ######')
    console.log(`Method: ${req.method}`);
    console.log(`Path: ${req.path}`);
    if (Object.keys(req.body).length) {
      console.log('Body:', req.body);
    }
    next();
  }
}
