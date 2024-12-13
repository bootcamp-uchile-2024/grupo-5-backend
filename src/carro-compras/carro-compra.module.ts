import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarUsuarios } from 'src/usuarios/entities/avatarusuarios.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import { UsuarioService } from 'src/usuarios/usuarios.service';
import { CarroCompraController } from './carro-compra.controller';
import { CarroCompraService } from './carro-compra.service';
import { CarroCompra } from './entities/carro-compra.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarroCompra, Usuario, AvatarUsuarios
    ]),
  ],
  controllers: [CarroCompraController],
  providers: [CarroCompraService, UsuarioService  ],
})
export class CarroComprasModule {}
