import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarUsuarios } from './entities/avatarusuarios.entity';
import { Usuario } from './entities/usuarios.entity';
import { UsuarioController } from './usuarios.controller';
import { UsuarioService } from './usuarios.service';
import { CarroCompraService } from 'src/carro-compras/carro-compra.service';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { CarroComprasModule } from 'src/carro-compras/carro-compra.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, AvatarUsuarios, CarroCompra]),
    
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, CarroCompraService],
})
export class UsuariosModule {}
