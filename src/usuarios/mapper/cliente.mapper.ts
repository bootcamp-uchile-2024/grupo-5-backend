import { RegisterClienteDto } from '../dto/create-cliente.dto';
import { Roles } from '../entities/roles.entity';
import { Usuario } from '../entities/usuarios.entity';
import { ReadClienteDto } from '../dto/read-cliente.dto';

export class ClienteMapper {
  static dtoToEntity(dto: RegisterClienteDto): Usuario {
    const entity = new Usuario();
    const rol = new Roles();
    rol.idRol = 1;

    entity.rut = dto.rutUsuario;
    entity.rol = rol;
    entity.avatar = 1;
    entity.nombres = dto.nombres;
    entity.apellidos = dto.apellidos;
    entity.email = dto.correoElectronico;
    entity.telefono = dto.telefono;
    entity.contrasena = dto.contrasena;
    entity.chkOfertas = dto.chkOfertas;
    entity.chkTerminos = true;
    entity.activo = true;
    return entity;
  }

  static entityToDto(entity: Usuario): ReadClienteDto {
    const dto = new ReadClienteDto();

    dto.idUsuario = entity.idUsuario;
    dto.rutUsuario = entity.rut;
    dto.nombres = entity.nombres;
    dto.apellidos = entity.apellidos;
    dto.correoElectronico = entity.email;
    dto.telefono = entity.telefono;
    dto.chkOfertas = entity.chkOfertas;
    dto.chkTerminos = entity.chkTerminos;
    dto.activo = entity.activo;

    return dto;
  }
}
