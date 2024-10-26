import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtributosEspecificos } from './productos/entities/atributosespecificos.entity';
import { AvatarMascota } from './mascotas/entities/avatarmascotas.entity';
import { AvatarUsuarios } from './usuarios/entities/avatarusuarios.entity';
import { Calendario } from './mascotas/entities/calendarios.entity';
import { CarroCompras } from './carrocompras/entities/carrocompra.entity';
import { CarrocomprasModule } from './carrocompras/carrocompras.module';
import { CategoriaProducto } from './productos/entities/categoriaproducto.entity';
import { Comuna } from './usuarios/entities/comunas.entity';
import { CondicionAlimentaria } from './mascotas/entities/condicionesalimentarias.entity';
import { ConexionModule } from './conexion/conexion.module';
import { ConfigModule } from '@nestjs/config';
import { DetalleCarroCompra } from './carrocompras/entities/detallescarrocompra.entity';
import { DetallesPedidos } from './productos/entities/detallespedidos.entity';
import { Direcciones } from './usuarios/entities/direcciones.entity';
import { Enfermedad_Base } from './mascotas/entities/enfermedadesbase.entity';
import { EquipoModule } from './equipo/equipo.module';
import { Especie } from './mascotas/entities/especies.entity';
import { Frecuencia } from './mascotas/entities/frecuncias.entity';
import { ImagenProducto } from './productos/entities/imagenproducto.entity';
import { LoggingMiddleware } from './commons/middleware/logging.middleware';
import { MarcaProducto } from './productos/entities/marcaproducto.entity';
import { Mascota } from './mascotas/entities/mascotas.entity';
import { MascotasModule } from './mascotas/mascotas.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Pedido } from './productos/entities/pedidos.entity';
import { plainToInstance } from 'class-transformer';
import { PresentacionProducto } from './productos/entities/presentacionproducto.entity';
import { Producto } from './productos/entities/producto.entity';
import { ProductosModule } from './productos/productos.module';
import { Raza } from './mascotas/entities/razas.entity';
import { Region } from './usuarios/entities/regiones.entity';
import { RegistroMedico } from './mascotas/entities/registromedico.entity';
import { Roles } from './usuarios/entities/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuarios.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Vacuna } from './mascotas/entities/vacunas.entity';
import { validateSync } from 'class-validator';
import { VariablesDeEntorno } from './commons/config/validation.config';

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
        AtributosEspecificos,
        AvatarMascota,
        AvatarUsuarios,
        Calendario,
        CarroCompras,
        CategoriaProducto,
        Comuna,
        CondicionAlimentaria,
        DetalleCarroCompra,
        DetallesPedidos,
        Direcciones,
        Enfermedad_Base,
        Especie,
        Frecuencia,
        ImagenProducto,
        MarcaProducto,
        Mascota,
        Pedido,
        PresentacionProducto,
        Producto,
        Raza,
        Region,
        RegistroMedico,
        Roles,
        Usuario,
        Vacuna
           ],
      synchronize: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'produccion' ? '.env.produccion' : '.env',
      validate: (config: Record<string, unknown>) => {
        const validatedConfig = plainToInstance(VariablesDeEntorno, config, { enableImplicitConversion: true });
        const errors = validateSync(validatedConfig, { skipMissingProperties: false });
        
        if (errors.length > 0) {
          throw new Error(`Validacion de Configuracion,  Error : ${errors.toString()}`);
        }
        return validatedConfig;
      },
    }),
      UsuariosModule, 
      MascotasModule, 
      ProductosModule, 
      EquipoModule, 
      ConexionModule, 
      CarrocomprasModule,
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
