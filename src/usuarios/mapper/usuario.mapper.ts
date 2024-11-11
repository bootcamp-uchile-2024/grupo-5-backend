import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { Usuario } from "../entities/usuarios.entity";

export class UsuarioMapper {
  static dtoToEntity(dto: CreateUsuarioDto): Usuario {
      const entity = new Usuario();
      entity.idUsuario = dto.idUsuario + 1;
      entity.rut = dto.rutUsuario;
      entity.nombreUsuario = dto.nombre;
      entity.apellidos = `${dto.apePaterno} ${dto.apeMaterno}`;
      entity.email = dto.correoElectronico;
      entity.telefono = parseInt(dto.telefono.replace('+56', ''), 10); // Convertir teléfono a entero
      entity.contrasena = dto.contrasena;
      entity.chkOfertas = dto.chkOfertas;
      entity.chkTerminos = dto.chkTerminos;
     return entity;

  }


  static entityToDto(entity: Usuario): CreateUsuarioDto {
    const dto = new CreateUsuarioDto();
    dto.rutUsuario= entity.rut;
    dto.nombre = entity.nombreUsuario;
    dto.apePaterno =`${dto.apePaterno}`
    dto.apeMaterno =`${dto.apeMaterno}`
    dto.correoElectronico = entity.email;
    dto.telefono = `${entity.telefono.toString()}`;
    dto.contrasena = entity.contrasena;
    dto.chkTerminos = entity.chkTerminos;
    dto.chkOfertas = entity.chkOfertas; 
    // dto.rol = entity.rol;
    // dto.avatar= entity.avatar; //
    // dto.direcciones = entity.direcciones;
    // dto.pedidos = entity.pedidos;
    // dto.carroCompras = entity.carroCompras;
    // dto.mascotas = entity.mascotas; //
    return dto;
}
}
