import { Module } from '@nestjs/common';
import { MarcaProductoService } from './marca-producto.service';
import { MarcaProductoController } from './marca-producto.controller';
import { MarcaProducto } from './entities/marca-producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      MarcaProducto
    ]),
  ],
  controllers: [MarcaProductoController],
  providers: [MarcaProductoService],
})
export class MarcaProductoModule {}
