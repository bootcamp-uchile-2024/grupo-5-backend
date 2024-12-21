import { RegisterInvitadoDto } from '../dto/create-invitado.dto';
import { ReadInvitadoDto } from '../dto/read-invitado.dto';
import { Roles } from '../entities/roles.entity';
import { Usuario } from '../entities/usuarios.entity';

export class InvitadoMapper {
  static dtoToEntity(dto: RegisterInvitadoDto): Usuario {
    const entity = new Usuario();

    const rol = new Roles();
    rol.idRol = 2;

    entity.rut = dto.rutUsuario;
    entity.rol = rol;
    entity.avatar = 1;
    entity.nombres = dto.nombres;
    entity.apellidos = dto.apellidos;
    entity.email = dto.correoElectronico;
    entity.telefono = dto.telefono;
    entity.contrasena = '';
    entity.chkOfertas = false;
    entity.chkTerminos = true;
    entity.activo = true;
    return entity;
  }

  static entityToDto(entity: Usuario): ReadInvitadoDto {
    const dto = new ReadInvitadoDto();

    dto.idUsuario = entity.idUsuario;
    dto.rutUsuario = entity.rut;
    dto.nombres = entity.nombres;
    dto.apellidos = entity.apellidos;
    dto.correoElectronico = entity.email;
    dto.telefono = entity.telefono;
    dto.carroCompra = entity.carroCompra;

    return dto;
  }
}
