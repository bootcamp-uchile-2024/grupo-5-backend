import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { ProductosModule } from './productos/productos.module';
import { EquipoModule } from './equipo/equipo.module';
import { LoggingMiddleware } from './commons/middleware/logging.middleware';
import { ConfigModule } from '@nestjs/config';
import { VariablesDeEntorno } from './commons/config/validation.config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConexionModule } from './conexion/conexion.module';
import { CarrocomprasModule } from './carrocompras/carrocompras.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',  
      //host: '127.0.0.1',  
      port: 3307,
      username: 'root',
      password: 'clave123',
      database: 'petropolis',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
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
