import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { ProductosModule } from './productos/productos.module';
import { EquipoModule } from './equipo/equipo.module';

@Module({
  imports: [UsuariosModule, MascotasModule, ProductosModule, EquipoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
