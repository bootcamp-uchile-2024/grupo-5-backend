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
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
//import { VariablesDeEntorno } from './commons/config/validation.config';
import { validateSync } from 'class-validator';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConexionModule } from './conexion/conexion.module';

@Module({
  imports: [
  TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'clave123',
  database: 'petropolis'
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