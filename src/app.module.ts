import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarroCompra } from './carro-compras/entities/carro-compra.entity';
import { VariablesDeEntorno } from './commons/config/validation.config';
import { LoggingMiddleware } from './commons/middleware/logging.middleware';
import { ConexionModule } from './conexion/conexion.module';
import { DetalleCarroComprasModule } from './detalle-carro-compras/detalle-carro-compras.module';
import { DetalleCarroCompra } from './detalle-carro-compras/entities/detalle-carro-compra.entity';
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
import { DetallesPedidos } from './productos/entities/detallespedidos.entity';
import { ImagenProducto } from './productos/entities/imagenproducto.entity';
import { Pedido } from './productos/entities/pedidos.entity';
import { Producto } from './productos/entities/producto.entity';
import { ProductosModule } from './productos/productos.module';
import { AvatarUsuarios } from './usuarios/entities/avatarusuarios.entity';
import { Comuna } from './comuna/entities/comuna.entity';
import { Region } from './region/entities/region.entity';
import { Roles } from './usuarios/entities/roles.entity';
import { Usuario } from './usuarios/entities/usuarios.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MarcaProductoModule } from './marca-producto/marca-producto.module';
import { MarcaProducto } from './marca-producto/entities/marca-producto.entity';
import { CategoriaProductoModule } from './categoria-producto/categoria-producto.module';
import { CategoriaProducto } from './categoria-producto/entities/categoria-producto.entity';
import { DescuentosModule } from './descuentos/descuentos.module';
import { Descuento } from './descuentos/entities/descuento.entity';
import { DetalleDescuento } from './descuentos/entities/detalle-descuento.entity';
import { CarroComprasModule } from './carro-compras/carro-compra.module';
import { ComunaModule } from './comuna/comuna.module';
import { RegionModule } from './region/region.module';
import { DireccionModule } from './direccion/direccion.module';
import { Direccion } from './direccion/entities/direccion.entity';


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
    ServeStaticModule.forRoot({
      rootPath: "./files",
      serveRoot: "/files",
    } ),
    ConfigModule.forRoot({
      isGlobal: true,
  envFilePath: process.env.NODE_ENV == 'dev' ? '.env_new' : '.env',    
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
    TypeOrmModule.forRootAsync ({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',  
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS_ROOT'),
        database: configService.get<string>('DB_NAME'),
        entities: [
        AvatarMascota,
        AvatarUsuarios,
        Calendario,
        CarroCompra,
        CategoriaProducto,
        Comuna,
        CondicionAlimentaria,
        Descuento,
        DetalleDescuento,
        DetalleCarroCompra,
        DetallesPedidos,
        Direccion,
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
  }),
    
    UsuariosModule,
    MascotasModule,
    ProductosModule,
    EquipoModule,
    ConexionModule,
    CarroComprasModule,
    DetalleCarroComprasModule,
    MarcaProductoModule,
    CategoriaProductoModule,
    DescuentosModule,
    DireccionModule,
    ComunaModule,
    RegionModule,
    DireccionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    // console.log('DB Type:', process.env.DB_TYPE);
    // console.log('DB Host:', process.env.DB_HOST);
    // console.log('DB Port:', process.env.DB_PORT);
    // console.log('DB Username:', process.env.DB_USER);
    // console.log('DB Password:', process.env.DB_PASS_ROOT);
    // console.log('DB Name:', process.env.DB_NAME);
  }
}
