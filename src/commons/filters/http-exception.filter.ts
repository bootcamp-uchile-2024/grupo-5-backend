import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {

    //constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const message = exception.getResponse()['message'];

      
  
      // Imprime en consola el estado HTTP y el mensaje de la excepción
      console.log('######################### INICIO FILTRO DE EXCEPCIONES #######################\n');
      console.log('response', response.status);
      console.log('HTTP Status:', status);
      console.log( message);
  
      // Devuelve la respuesta con el estado y el mensaje de la excepción
      response.status(status).json({
        statusCode: status,
        message,
      });
      console.log('######################### FINBAL FILTRO DE EXCEPCIONES #######################\n');
    }
  }

