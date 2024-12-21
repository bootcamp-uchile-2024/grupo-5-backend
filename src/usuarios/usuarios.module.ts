import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroCompraService } from 'src/carro-compras/carro-compra.service';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { DetalleCarroCompra } from 'src/detalle-carro-compras/entities/detalle-carro-compra.entity';
import { AvatarUsuarios } from './entities/avatarusuarios.entity';
import { Usuario } from './entities/usuarios.entity';
import { UsuarioController } from './usuarios.controller';
import { UsuarioService } from './usuarios.service';
import { DetalleCarroComprasService } from 'src/detalle-carro-compras/detalle-carro-compras.service';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      AvatarUsuarios,
      CarroCompra,
      DetalleCarroCompra,
      Producto
    ]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, CarroCompraService, DetalleCarroComprasService],
})
export class UsuariosModule {}
