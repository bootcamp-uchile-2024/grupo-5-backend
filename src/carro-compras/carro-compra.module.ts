import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroCompra } from './entities/carro-compra.entity';
import { CarroCompraService } from './carro-compra.service';
import { CarroCompraController } from './carro-compra.controller';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import { AvatarUsuarios } from 'src/usuarios/entities/avatarusuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarroCompra, Usuario, AvatarUsuarios
    ]),
  ],
  controllers: [CarroCompraController],
  providers: [CarroCompraService, UsuariosService,  ],
})
export class CarrocomprasModule {}
