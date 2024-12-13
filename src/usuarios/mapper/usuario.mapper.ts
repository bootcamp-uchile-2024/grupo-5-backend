import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { RegisterUsuarioDto } from "../dto/register-usuario.dto";
import { Usuario } from "../entities/usuarios.entity";

export class UsuarioMapper {
  static dtoToEntity(dto: CreateUsuarioDto): Usuario {
      const entity = new Usuario();
      entity.idUsuario = dto.idUsuario;
      entity.rut = dto.rutUsuario;
      entity.idRol= dto.rolUsuario;
      entity.avatar = dto.idAvatar;
      entity.nombres = dto.nombre;
      entity.apellidos = `${dto.apePaterno} ${dto.apeMaterno}`;
      entity.email = dto.correoElectronico;
      entity.telefono = parseInt(dto.telefono.replace('+56', ''), 10); // Convertir teléfono a entero
      entity.contrasena = dto.contrasena;
      entity.chkOfertas = dto.chkOfertas;
      entity.chkTerminos = true;
      entity.activo = dto.activo;
     return entity;
  }

  static dtoRegisterUsuarioToEntity(dto: RegisterUsuarioDto): Usuario {
    const entity = new Usuario();

    entity.rut = dto.rutUsuario;
    entity.idRol= 1;
    entity.avatar = 1;
    entity.nombres = dto.nombres;
    entity.apellidos = dto.apellidos;
    entity.email = dto.correoElectronico;
    entity.telefono = parseInt(dto.telefono.replace('+56', ''), 10); // Convertir teléfono a entero
    entity.contrasena = dto.contrasena;
    entity.chkOfertas = dto.chkOfertas;
    entity.chkTerminos = true;
    entity.activo = true;
    return entity;
  }


  static entityToDto(entity: Usuario): CreateUsuarioDto {
    const dto = new CreateUsuarioDto(); 
    dto.rutUsuario= entity.rut;          //PREGUNTAR
    dto.rolUsuario =entity.idRol;          //PREGUNTAR
    dto.nombre = entity.nombres;
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
