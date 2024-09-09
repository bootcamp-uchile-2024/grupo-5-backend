import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { ProductosModule } from './productos/productos.module';
import { EquipoModule } from './equipo/equipo.module';
import { LoggingMiddleware } from './commons/middleware/logging.middleware'; 

@Module({
  imports: [UsuariosModule, MascotasModule, ProductosModule, EquipoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware) // Aplica el middleware
      .forRoutes('*'); // A todas las rutas
  }
}
