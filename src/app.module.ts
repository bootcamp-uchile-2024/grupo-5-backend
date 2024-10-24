import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VariablesDeEntorno } from './commons/config/validation.config';
import { LoggingMiddleware } from './commons/middleware/logging.middleware';
import { EquipoModule } from './equipo/equipo.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
//import { VariablesDeEntorno } from './commons/config/validation.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validateSync } from 'class-validator';

import { ConexionModule } from './conexion/conexion.module';
import { Mascota } from './mascotas/entities/mascota.entity';
import { Atributo_especifico } from './orm/entity/atributo_especifico';
import { Avatar_mascota } from './orm/entity/avatar_mascota';
import { Avatar_usuario } from './orm/entity/avatar_usuario';
import { Calendario } from './orm/entity/calendario';
import { Carro_Compra } from './orm/entity/carro_compra';
import { Categoria_producto } from './orm/entity/categoria_producto';
import { Comuna } from './orm/entity/comuna';
import { Condicion_Alimentaria } from './orm/entity/condicion_alimentaria';
import { Detalle_Carro_Compra } from './orm/entity/detalle_carro_compra';
import { Detalle_pedido } from './orm/entity/detalle_pedido';
import { Direccion } from './orm/entity/direccion';
import { Enfermedad_Base } from './orm/entity/enfermedad_base';
import { Especie } from './orm/entity/especie';
import { Frecuencia } from './orm/entity/frecuencia';
import { Imagen_Producto } from './orm/entity/imagen_producto';
import { Marca_producto } from './orm/entity/marca_producto';
import { Pedido } from './orm/entity/pedido';
import { Presentacion_producto } from './orm/entity/presentacion_producto';
import { Raza } from './orm/entity/raza';
import { Region } from './orm/entity/region';
import { Registro_Medico } from './orm/entity/registro_medico';
import { Rol } from './orm/entity/rol';
import { Vacuna } from './orm/entity/vacuna';
import { Producto } from './productos/entities/producto.entity';
import { Usuario } from './usuarios/entities/usuario.entity';


@Module({
  imports: [
  TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'clave123',
  database: 'petropolis',
  entities: [
    Atributo_especifico,
    Avatar_mascota,
    Avatar_usuario,
    Calendario,
    Carro_Compra,
    Categoria_producto,
    Comuna,
    Condicion_Alimentaria,
    Detalle_Carro_Compra,
    Detalle_pedido,
    Direccion,
    Enfermedad_Base,
    Especie,
    Frecuencia,
    Imagen_Producto,
    Marca_producto,
    Mascota,
    Pedido,
    Presentacion_producto,
    Producto,
    Raza,
    Registro_Medico,
    Region,
    Rol,
    Usuario,
    Vacuna

  ],
  }),
  
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'produccion' ? '.env.produccion' : '.env.desarrollo',
      validate: (config: Record<string, unknown>) => {
        const validatedConfig = plainToInstance(VariablesDeEntorno, config, { enableImplicitConversion: true });
        const errors = validateSync(validatedConfig, { skipMissingProperties: false });
        
        if (errors.length > 0) {
          throw new Error(`Config validation error: ${errors.toString()}`);
        }
        return validatedConfig;
      },
    }),
    UsuariosModule, MascotasModule, ProductosModule, EquipoModule, ConexionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}