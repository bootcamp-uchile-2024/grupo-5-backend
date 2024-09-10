// import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
// import { Response } from 'express';
  
//   @Catch(HttpException)
//   export class HttpExceptionFilter implements ExceptionFilter {
//     catch(exception: HttpException, host: ArgumentsHost) {
//       const ctx = host.switchToHttp();
//       const response = ctx.getResponse<Response>();
//       const status = exception.getStatus();
//       const message = exception.message;
  
//       // Imprime en consola el estado HTTP y el mensaje de la excepción
//       console.log('######################### INICIO FILTRO DE EXCEPCIONES #######################\n');
//       console.log('response', response.status);
//       console.log('HTTP Status:', status);
//       console.log('Exception Message:', message);
  
//       // Devuelve la respuesta con el estado y el mensaje de la excepción
//       response.status(status).json({
//         statusCode: status,
//         message,
//       });
//     }
//   }

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Obtiene el contexto HTTP desde el host de argumentos
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Obtiene el estado HTTP de la excepción
    const estadoHTTP = exception.getStatus();

    // Mensaje de error por defecto
    let mensaje = 'Error interno del servidor';
    //console.log('BadRequestException: ' , BadRequestException);

    // Verifica si la excepción es de tipo BadRequestException
    if (exception instanceof BadRequestException) {
       //console.log('Entro al if');
      // Obtiene la respuesta de la excepción, que puede ser un objeto
      const exceptionResponse = exception.getResponse();

        // Verifica si exceptionResponse es un objeto y no es nulo
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        //console.log('exceptionResponsef', exceptionResponse);
        // Obtiene el mensaje de validación
        let mensajeValidacion = (exceptionResponse as { message?: string | string[] }).message;
        //console.log('mensajeValidacion', mensajeValidacion);
        // Si el mensaje de validación es un array, une todos los mensajes en una sola cadena
         if (Array.isArray(mensajeValidacion)) {
           mensaje = mensajeValidacion.join(', ');
         } 
        // Si el mensaje de validación es una cadena, usa esa cadena
        else if (typeof mensajeValidacion === 'string') {
          mensaje = mensajeValidacion;
        }
      }
    }

    // Imprime en consola el estado HTTP y el mensaje de la excepción
    console.log('######################### INICIO FILTRO DE EXCEPCIONES #######################');
    console.log('HTTP Status:', estadoHTTP);
    console.log('Exception Message:', mensaje);

    // Devuelve la respuesta con el estado y el mensaje de la excepción
    response.status(estadoHTTP).json({
      statusCode: estadoHTTP,
      mensaje,
    });
    console.log('######################### FIN  FILTRO DE EXCEPCIONES #######################');
  }
}
