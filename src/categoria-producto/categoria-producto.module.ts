import { Module } from '@nestjs/common';
import { CategoriaProductoService } from './categoria-producto.service';
import { CategoriaProductoController } from './categoria-producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaProducto } from './entities/categoria-producto.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoriaProducto,
      Producto,
    ]),
  ],
  controllers: [CategoriaProductoController],
  providers: [CategoriaProductoService],
})
export class CategoriaProductoModule {}
