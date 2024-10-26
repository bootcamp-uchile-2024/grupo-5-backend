import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoController } from './productos.controller';
import { ProductoService } from './productos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])
          ],  // Registramos el repositorio de Producto
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductosModule {}

