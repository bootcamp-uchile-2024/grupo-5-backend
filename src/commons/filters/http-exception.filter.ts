import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const message = exception.message;
  
      // Imprime en consola el estado HTTP y el mensaje de la excepción
      console.log('###### FILTRO DE EXCEPCIONES ######')
      console.log('HTTP Status:', status);
      console.log('Exception Message:', message);
  
      // Devuelve la respuesta con el estado y el mensaje de la excepción
      response.status(status).json({
        statusCode: status,
        message,
      });
    }
  }
  