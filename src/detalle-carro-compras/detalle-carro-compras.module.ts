import { Module } from '@nestjs/common';
import { DetalleCarroComprasService } from './detalle-carro-compras.service';
import { DetalleCarroComprasController } from './detalle-carro-compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCarroCompra } from './entities/detalle-carro-compra.entity';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarroCompra,
      DetalleCarroCompra,
      Producto
    ]),
  ],
  controllers: [DetalleCarroComprasController],
  providers: [DetalleCarroComprasService],
})
export class DetalleCarroComprasModule {}
