import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('\n########################### INCIO MIDDLEWARE #######################');
    console.log(`Method: ${req.method}`);
    console.log(`Path: ${req.originalUrl}`);
   // console.log(`Path: ${req.path}`);
    
    if (Object.keys(req.body).length) { 
      console.log(`Body:{`);
      for (const [key, value] of Object.entries(req.body)) {
        console.log(`  [${key}]: '${value}'`);
      }
      console.log(`}`);
    }
     
    else {
      console.log(`Body:{}`);
    }
    console.log('########################### FIN MIDDLEWARE #########################\n');

    next();
  }
}
