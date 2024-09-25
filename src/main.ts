import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { ProductosModule } from './productos/productos.module';
import { LoggingInterceptor } from './commons/interceptors/logging.interceptor';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';

import { ConfigService } from '@nestjs/config';

import * as ArchivoPackageJson from  '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Aplicar el interceptor globalmente
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Aplicar el filtro de excepciones globalmente
  app.useGlobalFilters(new HttpExceptionFilter());

  // Configuración de Swagger para Usuarios
  const config1 = new DocumentBuilder()
    .setTitle(ArchivoPackageJson.name + ' - Usuarios')
    .setDescription(ArchivoPackageJson.description + ' Usuarios')
    .setVersion(ArchivoPackageJson.version)
    .addTag('Crear Usuarios')
    .addTag('Buscar Usuarios')
    .addTag('Actualizar Usuarios')
    .addTag('Eliminar Usuarios')
    .build();
  const document1 = SwaggerModule.createDocument(app, config1, {
    include: [AppModule, UsuariosModule],
  });
  SwaggerModule.setup('api/usuario', app, document1);

  // Configuración de Swagger para Mascotas
  const config2 = new DocumentBuilder()
    .setTitle(ArchivoPackageJson.name + ' - Mascotas')
    .setDescription(ArchivoPackageJson.description + ' Mascotas')
    .setVersion(ArchivoPackageJson.version)
    .addTag('Buscar Mascotas')
    .addTag('Crear Mascotas')
    .addTag('Actualizar Mascotas')
    .addTag('Eliminar Mascotas')
    .build();
  const document2 = SwaggerModule.createDocument(app, config2, {
    include: [AppModule, MascotasModule],
  });
  SwaggerModule.setup('api/mascota', app, document2);

  // Configuración de Swagger para Productos
  const config3 = new DocumentBuilder()
    .setTitle(ArchivoPackageJson.name + ' - Productos')
    .setDescription(ArchivoPackageJson.description + ' Productos')
    .setVersion(ArchivoPackageJson.version)
    .addTag('Crear Producto')
    .addTag('Buscar Catálogo de Productos')
    .addTag('Buscar Detalle de Producto')
    .addTag('Actualizar Producto')
    .addTag('Eliminar Producto')
    .build();
  const document3 = SwaggerModule.createDocument(app, config3, {
    include: [AppModule, ProductosModule],
  });
  SwaggerModule.setup('api/producto', app, document3);

  const port = configService.get('PORT') || 'PORT_DEFAULT';
  await app.listen(port);
  console.log(`La aplicación se encuentra corriendo es el puerto:  ${await app.getUrl()}`);
}

bootstrap();
