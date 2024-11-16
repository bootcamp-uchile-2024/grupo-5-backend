import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarrocomprasModule } from './carrocompras/carrocompras.module';
import { CarroCompras } from './carrocompras/entities/carroCompra.entity';
import { DetalleCarroCompra } from './carrocompras/entities/detalleCarroCompra.entity';
import { VariablesDeEntorno } from './commons/config/validation.config';
import { LoggingMiddleware } from './commons/middleware/logging.middleware';
import { ConexionModule } from './conexion/conexion.module';
import { EquipoModule } from './equipo/equipo.module';
import { AvatarMascota } from './mascotas/entities/avatarmascotas.entity';
import { Calendario } from './mascotas/entities/calendarios.entity';
import { CondicionAlimentaria } from './mascotas/entities/condicionesalimentarias.entity';
import { Enfermedad_Base } from './mascotas/entities/enfermedadesbase.entity';
import { Especie } from './mascotas/entities/especies.entity';
import { Frecuencia } from './mascotas/entities/frecuncias.entity';
import { Mascota } from './mascotas/entities/mascotas.entity';
import { Raza } from './mascotas/entities/razas.entity';
import { RegistroMedico } from './mascotas/entities/registromedico.entity';
import { Vacuna } from './mascotas/entities/vacunas.entity';
import { MascotasModule } from './mascotas/mascotas.module';
import { CategoriaProducto } from './productos/entities/categoriaproducto.entity';
import { DetallesPedidos } from './productos/entities/detallespedidos.entity';
import { ImagenProducto } from './productos/entities/imagenproducto.entity';
import { MarcaProducto } from './productos/entities/marcaproducto.entity';
import { Pedido } from './productos/entities/pedidos.entity';
import { Producto } from './productos/entities/producto.entity';
import { ProductosModule } from './productos/productos.module';
import { AvatarUsuarios } from './usuarios/entities/avatarusuarios.entity';
import { Comuna } from './usuarios/entities/comunas.entity';
import { Direcciones } from './usuarios/entities/direcciones.entity';
import { Region } from './usuarios/entities/regiones.entity';
import { Roles } from './usuarios/entities/roles.entity';
import { Usuario } from './usuarios/entities/usuarios.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
// imports: [
//   TypeOrmModule.forRoot({
// type: process.env.DB_TYPE as 'mysql',  //dependiendo de tu configuración
// host: process.env.DB_HOST,
// port: Number(process.env.DB_PORT),
// username: process.env.DB_USER,
// password: process.env.DB_PASS_ROOT,
// database: process.env.DB_NAME,
// entities: [

// imports: [
//   TypeOrmModule.forRoot({
//     type: 'mysql', //dependiendo de tu configuración
//     host: 'localhost',
//     port: 5002,
//     username: 'root',
//     password: 'clave123',
//     database: 'petropolis',
//     entities: [

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql', //dependiendo de tu configuración
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS_ROOT,
      database: process.env.DB_NAME,
      entities: [
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
        Producto,
        Raza,
        Region,
        RegistroMedico,
        Roles,
        Usuario,
        Vacuna,
      ],
      synchronize: false,
      logging: true, //Me aparezca la consulta SQL
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'produccion' ? '.env.produccion' : '.env',
      validate: (config: Record<string, unknown>) => {
        const validatedConfig = plainToInstance(VariablesDeEntorno, config, {
          enableImplicitConversion: true,
        });
        const errors = validateSync(validatedConfig, {
          skipMissingProperties: false,
        });

        if (errors.length > 0) {
          throw new Error(
            `Validacion de Configuracion,  Error : ${errors.toString()}`,
          );
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
    consumer.apply(LoggingMiddleware).forRoutes('*');
    console.log('DB Type:', process.env.DB_TYPE);
    console.log('DB Host:', process.env.DB_HOST);
    console.log('DB Port:', process.env.DB_PORT);
    console.log('DB Username:', process.env.DB_USER);
    console.log('DB Password:', process.env.DB_PASS_ROOT);
    console.log('DB Name:', process.env.DB_NAME);
  }
}
