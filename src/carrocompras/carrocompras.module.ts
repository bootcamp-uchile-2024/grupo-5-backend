import { Module } from '@nestjs/common';
import { CarroComprasService } from './carrocompras.service';
import { CarroComprasController } from './carrocompras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroCompras } from './entities/carrocompra.entity';
import { DetalleCarroCompra } from './entities/detallescarrocompra.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([CarroCompras, DetalleCarroCompra, Usuario]), 
  ],
  controllers: [CarroComprasController],
  providers: [CarroComprasService],
  exports: [CarroComprasService],
})
export class CarroComprasModule {}
