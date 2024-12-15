import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCarroComprasController } from 'src/detalle-carro-compras/detalle-carro-compras.controller';
import { DetalleCarroComprasService } from 'src/detalle-carro-compras/detalle-carro-compras.service';
import { DetalleCarroCompra } from 'src/detalle-carro-compras/entities/detalle-carro-compra.entity';
import { AvatarUsuarios } from 'src/usuarios/entities/avatarusuarios.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import { UsuarioService } from 'src/usuarios/usuarios.service';
import { CarroCompraController } from './carro-compra.controller';
import { CarroCompraService } from './carro-compra.service';
import { CarroCompra } from './entities/carro-compra.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarroCompra, Usuario, AvatarUsuarios, DetalleCarroCompra, Producto
    ]),
  ],
  controllers: [CarroCompraController],
  providers: [CarroCompraService, UsuarioService, DetalleCarroComprasService  ],
})
export class CarroComprasModule {}
