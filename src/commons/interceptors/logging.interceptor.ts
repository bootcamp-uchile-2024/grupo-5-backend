import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        tap((data) => {
          console.log('###### INTERCEPTOR ######')
          console.log('Response Data:', data); // Imprime el resultado exitoso
        }),
      );
    }
  }
  