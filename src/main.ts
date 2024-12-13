import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import { LoggingInterceptor } from './commons/interceptors/logging.interceptor';
import { MascotasModule } from './mascotas/mascotas.module';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';

import * as ArchivoPackageJson from '../package.json';

import { ConfigService } from '@nestjs/config';
import { CategoriaProductoModule } from './categoria-producto/categoria-producto.module';
import { DetalleCarroComprasModule } from './detalle-carro-compras/detalle-carro-compras.module';
import { MarcaProductoModule } from './marca-producto/marca-producto.module';
import { DescuentosModule } from './descuentos/descuentos.module';
import * as bodyParser from 'body-parser';
import { CarroComprasModule } from './carro-compras/carro-compra.module';
import { RegionModule } from './region/region.module';
import { ComunaModule } from './comuna/comuna.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Configurar el límite de tamaño del cuerpo
    app.use(bodyParser.json({ limit: '10mb' })); 
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


  app.enableCors();
  const configService = app.get(ConfigService);

  // Aplicar el interceptor globalmente
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Aplicar el filtro de excepciones globalmente
  app.useGlobalFilters(new HttpExceptionFilter());

  //const app = await NestFactory.create(AppModule);
  //const configService = app.get(ConfigService);
  const env = process.env.NODE_ENV;

  //#region Configuración de Swagger para Usuarios
  const config1 = new DocumentBuilder()
    .setTitle(
      ArchivoPackageJson.CopyrightName + ' - Módulo Usuarios (' + env + ')',
    )
    .setDescription(ArchivoPackageJson.description + ' Usuarios')
    .setVersion(ArchivoPackageJson.version)
    .setContact(
      ArchivoPackageJson.author,
      ArchivoPackageJson.url,
      ArchivoPackageJson.mail,
    )
    .setLicense(ArchivoPackageJson.license, '')
    .addTag('Crear Usuarios')
    .addTag('Registrar Usuarios')
    .addTag('Buscar Usuarios')
    .addTag('Actualizar Usuarios')
    .addTag('Eliminar Usuarios')
    .addTag('Gestión de Regiones')
    .build();
  const document1 = SwaggerModule.createDocument(app, config1, {
    include: [AppModule, UsuariosModule, RegionModule, ComunaModule],
  });
  SwaggerModule.setup('api/usuario', app, document1, {
    customSiteTitle: 'Usuarios - API Petropolis',
    customfavIcon: 'https://img.icons8.com/?size=48&id=13042&format=png',
    customCss: '.swagger-ui .topbar { background-color: #05C7F2; }'
  });
  //#endregion

  //#region Configuración de Swagger para Mascotas
  const config2 = new DocumentBuilder()
    .setTitle(
      ArchivoPackageJson.CopyrightName + ' - Módulo Mascotas (' + env + ')',
    )
    .setDescription(ArchivoPackageJson.description + ' Mascotas')
    .setVersion(ArchivoPackageJson.version)
    .setContact(
      ArchivoPackageJson.author,
      ArchivoPackageJson.url,
      ArchivoPackageJson.mail,
    )
    .setLicense(ArchivoPackageJson.license, '')
    .addTag('Buscar Mascotas')
    .addTag('Crear Mascotas')
    .addTag('Actualizar Mascotas')
    .addTag('Eliminar Mascotas')
    .build();
  const document2 = SwaggerModule.createDocument(app, config2, {
    include: [AppModule, MascotasModule],
  });
  SwaggerModule.setup('api/mascota', app, document2, {
    customSiteTitle: 'Mascotas - API Petropolis',
    customfavIcon: 'https://img.icons8.com/?size=48&id=16018&format=png',
    customCss: '.swagger-ui .topbar { background-color: #05C7F2; }'
  });
  //#endregion

  //#region Configuración de Swagger para Productos
  const config3 = new DocumentBuilder()
    .setTitle(
      ArchivoPackageJson.CopyrightName + ' - Módulo Productos (' + env + ')',
    )
    .setDescription(ArchivoPackageJson.description + ' Productos')
    .setVersion(ArchivoPackageJson.version)
    .setContact(
      ArchivoPackageJson.author,
      ArchivoPackageJson.url,
      ArchivoPackageJson.mail,
    )
    .setLicense(ArchivoPackageJson.license, '')
    .addTag('Carro de Compras')
    .addTag('Gestión de Descuentos')
    .addTag('Marca Productos')
    .addTag('Categoría Productos')
    .addTag('Productos')
    .addTag('Catálogo de Productos')
    // .addTag('Crear Producto')
    // .addTag('Actualizar Producto')
    // .addTag('Alta de un Producto')
    // .addTag('Baja de un Producto')
    // .addTag('Obtener Detalle de Producto')
    .build();
  const document3 = SwaggerModule.createDocument(app, config3, {
    include: [
      AppModule,
      CategoriaProductoModule,
      CarroComprasModule,
      DescuentosModule,
      DetalleCarroComprasModule,
      MarcaProductoModule,
      ProductosModule,
    ],
  });
  SwaggerModule.setup('api/producto', app, document3, {
    customSiteTitle: 'Productos - API Petropolis',
    customfavIcon: 'https://img.icons8.com/?size=48&id=16045&format=png',
    customCss: '.swagger-ui .topbar { background-color: #FFD020; }'
  });
 //#endregion

  //#region Console Info
  const puerto = process.env.NESTJS_PORT || 3040;
  await app.listen(puerto, '0.0.0.0');
  console.log(
    '\t\t**************************************************************',
  );
  console.log(
    '\t\t*                                                            *',
  );
  console.log(
    '\t\t*                Swagger API Petropolis                      *',
  );
  console.log(
    `\t\t*    Servidor corriendo sobre  http://localhost:${puerto}         *`,
  );
  console.log(
    '\t\t*                                                            *',
  );
  console.log(
    '\t\t**************************************************************',
  );
  //console.log(`La aplicación se encuentra corriendo es el puerto de:  ${await app.getUrl()}`);
  //#endregion
}

bootstrap();
