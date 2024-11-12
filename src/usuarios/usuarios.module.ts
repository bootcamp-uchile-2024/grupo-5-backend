import { Module } from '@nestjs/common';
import { UsuarioController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuarios.entity';
import { AvatarUsuarios } from './entities/avatarusuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, AvatarUsuarios])],
  controllers: [UsuarioController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
