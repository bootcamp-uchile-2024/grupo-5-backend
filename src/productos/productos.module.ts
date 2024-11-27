import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoController } from './productos.controller';
import { ProductoService } from './productos.service';
import { ImagenProducto } from './entities/imagenproducto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto,ImagenProducto])
          ],  // Registramos el repositorio de Producto
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductosModule {}

