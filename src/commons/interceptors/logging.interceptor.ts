import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

      // const request = context.switchToHttp().getRequest();
      // const body = request.body;

      // console.log('Nombre:', body.nombre);
      // if (typeof body.nombre !== 'string' || !body.nombre.trim()) {
      //   throw new BadRequestException('El atributo "nombre" debe ser una cadena de texto y no vacia');
      // }
      console.log('######################### INICIO INTERCEPTOR #######################\n');

      return next.handle()  //Ejecuta el controlador.
        .pipe(
            map((val) => { 
                      console.log(`Resultado Servicio : ${val}. \n`);
                      console.log('######################### FINAL INTERCEPTOR ########################\n');
                      return val;
                    }
               ),
            catchError((err) => { 
                                  console.log('ERROR: ' + err.message + '\n'); 
                                  console.log('######################### FINAL INTERCEPTOR ########################\n');
                                  throw err; 
                                }
                      )
        );
       
      }
       // tap((data) => {
       //   console.log('########################### INTERCEPTOR ########################### ');
       //   console.log('Response Data:', data); // Imprime el resultado exitoso
       // }),
      //);
    }
