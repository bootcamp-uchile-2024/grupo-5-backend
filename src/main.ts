import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { ProductosModule } from './productos/productos.module';
async function bootstrap() {
const app = await NestFactory.create(AppModule);

const config1 = new DocumentBuilder()
.setTitle('API Proyecto Petropolis - Usuarios')
.setDescription('Esta API describe los métodos para la Gestión de Usuarios')
.setVersion('1.0.0')
.addTag('Buscar Usuarios')
.addTag('Crear Usuarios')
.addTag('Actualizar Usuarios')
.addTag('Eliminar Usuarios')
.build();

const config2 = new DocumentBuilder()
.setTitle('API Proyecto Petropolis - Mascotas')
.setDescription('Esta API describe los métodos para la Gestión de Mascotas')
.setVersion('1.0.0')
.addTag('Buscar Mascotas')
.addTag('Crear Mascotas')
.addTag('Actualizar Mascotas')
.addTag('Eliminar Mascotas')
.build();

const config3 = new DocumentBuilder()
.setTitle('API Proyecto Petropolis - Productos')
.setDescription('Esta API describe los métodos para la Gestión de Productos')
.setVersion('1.0.0')
.addTag('Buscar Productos')
.addTag('Crear Productos')
.addTag('Actualizar Productos')
 .addTag('Eliminar Productos')
.build();

const document1 = SwaggerModule.createDocument(app, config1,{include: [AppModule, UsuariosModule]});
const document2 = SwaggerModule.createDocument(app, config2,{include: [AppModule, MascotasModule]});
const document3 = SwaggerModule.createDocument(app, config3,{include: [AppModule, ProductosModule]});
SwaggerModule.setup('API/usuario', app, document1);
SwaggerModule.setup('API/mascota', app, document2);
SwaggerModule.setup('API/producto', app, document3);

await app.listen(3000);
}
bootstrap();