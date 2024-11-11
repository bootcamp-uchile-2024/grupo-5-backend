import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ActualizaUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioMapper } from './mapper/usuario.mapper';
import { Usuario } from './entities/usuarios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
  ) {}
  // Crear un nuevo usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = UsuarioMapper.dtoToEntity(createUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

 // Obtener todos los usuarios
 async findAll(): Promise<Usuario[]> {
  return await this.usuarioRepository.find();
}

async findOne(id: number): Promise<Usuario> {
  const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: id } });
  if (!usuario) {
    throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  }
  return usuario;
}

  // Actualizar un usuario existente
  async update(id: number, updateUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    const updatedUsuario = UsuarioMapper.dtoToEntity(updateUsuarioDto);
    updatedUsuario.idUsuario = usuario.idUsuario; // Preservar el ID del usuario existente
    await this.usuarioRepository.save(updatedUsuario);
    return updatedUsuario;
  }

  // Eliminar un usuario
  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
}
