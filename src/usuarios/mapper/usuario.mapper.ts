import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { Usuario } from "../entities/usuarios.entity";

export class UsuarioMapper {
  static dtoToEntity(dto: CreateUsuarioDto): Usuario {
      const entity = new Usuario();
      entity.idUsuario = dto.idUsuario;
      entity.rut = dto.rutUsuario;
      entity.rol= dto.rolUsuario;
      entity.avatar = dto.idAvatar;
      entity.nombreUsuario = dto.nombre;
      entity.apellidos = `${dto.apePaterno} ${dto.apeMaterno}`;
      entity.email = dto.correoElectronico;
      entity.telefono = parseInt(dto.telefono.replace('+56', ''), 10); // Convertir teléfono a entero
      entity.contrasena = dto.contrasena;
      entity.chkOfertas = dto.chkOfertas;
      entity.chkTerminos = dto.chkTerminos;
      entity.activo = dto.activo;
     return entity;

  }


  static entityToDto(entity: Usuario): CreateUsuarioDto {
    const dto = new CreateUsuarioDto(); 
    dto.rutUsuario= entity.rut;          //PREGUNTAR
    dto.rolUsuario =entity.rol;          //PREGUNTAR
    dto.nombre = entity.nombreUsuario;
    dto.apePaterno =`${dto.apePaterno}` //PREGUNTAR
    dto.apeMaterno =`${dto.apeMaterno}` //PREGUNTAR
    dto.correoElectronico = entity.email;
    dto.telefono = `${entity.telefono.toString()}`;
    dto.contrasena = entity.contrasena;
    dto.chkTerminos = entity.chkTerminos;
    dto.chkOfertas = entity.chkOfertas; 
    dto.activo = entity.activo;
    dto.idAvatar= entity.avatar; 
    // dto.rol = entity.rol;
    // dto.direcciones = entity.direcciones;
    // dto.pedidos = entity.pedidos;
    // dto.carroCompras = entity.carroCompras;
    // dto.mascotas = entity.mascotas; //
    return dto;
}
}
