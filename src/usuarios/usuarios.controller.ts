import {   Controller,   Get,   Post,   Body,   Param,   Delete,   Put, Query, NotFoundException, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioDto } from './dto/read-usuario.dto';
import { ActualizaUsuarioDto } from './dto/update-usuario.dto';
import {   ApiBody,   ApiOperation,   ApiParam,   ApiQuery,   ApiResponse,   ApiTags } from '@nestjs/swagger';
import { Usuario } from './entities/usuarios.entity';
import { UserRole } from './roles.enum';
import { CreateProductoDto } from 'src/productos/dto/create-producto.dto';
import { EliminaUsuarioDto } from './dto/delete-usuario.dto';

@Controller('usuarios')
export class UsuariosController {

  @ApiTags('Buscar Usuarios')
  @ApiOperation({ summary: 'Obtener el listado de todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Obtiene todos los usuarios' })
  @ApiResponse({ status: 404, description: 'No se encontraron usuarios' })
  @ApiQuery({ name: 'rolUsuario', required: false, description: 'Rol del Usuario', enum: UserRole })
  @Get()
  obtenerUsuarios(
    @Query('rolUsuario') rolUsuario: UserRole,
  ):string{//}: Usuario[] {
    //return 'Este método retorna todos los usuarios';
    const usuarios = [
      {
      rutUsuario: '10234945-K',
      contrasena: 'password123',
      nombre: 'Juan',
      apePaterno: 'Pérez',
      apeMaterno: 'González',
      correoElectronico: 'juan.perez@example.com',
      telefono: '+56912345678',
      rolUsuario: UserRole.CLIENTE,
    },
    {rutUsuario: '13257114-1',
      contrasena: 'laterribleclave',
      nombre: 'Paola',
      apePaterno: 'Navia',
      apeMaterno: 'Abarza',
      correoElectronico: 'paola.navia@example.com',
      telefono: '+5684538299',
      rolUsuario: UserRole.ADMINISTRADOR,
    },
    {rutUsuario: '11111111-1',
      contrasena: 'tiger',
      nombre: 'Jhon',
      apePaterno: 'Smith',
      apeMaterno: 'Brown',
      correoElectronico: 'Jhon.Smith@example.com',
      telefono: '+58912563278',
      rolUsuario: UserRole.MANAGER,
    },
    {rutUsuario: '1-1',
      contrasena: '',
      nombre: '',
      apePaterno: '',
      apeMaterno: '',
      correoElectronico: '',
      telefono: '',
      rolUsuario: UserRole.INVITADO,
    }
  ];
 // Filtrar por marca y precio si están presentes
 const resultado = usuarios.filter(usuarios => {
  return (
    (!rolUsuario || usuarios.rolUsuario == rolUsuario)
  );
});

if (resultado.length === 0) {
  throw new NotFoundException('Usuario(s) no encontrado(s).');
}

return JSON.stringify(resultado);

  }

  @ApiTags('Buscar Usuarios')
  @ApiOperation({ summary: 'Obtener usuario por RUT' })
  @ApiParam({ name: 'rut', description: 'RUT del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':rut')
  obtenerUsuariosRut(
    @Query('rut') rut: string,
  ):string{//}: Usuario[] {
    //return 'Este método retorna todos los usuarios';
    const usuarios = [
      {
      rutUsuario: '10234945-K',
      contrasena: 'password123',
      nombre: 'Juan',
      apePaterno: 'Pérez',
      apeMaterno: 'González',
      correoElectronico: 'juan.perez@example.com',
      telefono: '+56912345678',
      rolUsuario: UserRole.CLIENTE,
    },
    {rutUsuario: '13257114-1',
      contrasena: 'laterribleclave',
      nombre: 'Paola',
      apePaterno: 'Navia',
      apeMaterno: 'Abarza',
      correoElectronico: 'paola.navia@example.com',
      telefono: '+5684538299',
      rolUsuario: UserRole.ADMINISTRADOR,
    },
    {rutUsuario: '11111111-1',
      contrasena: 'tiger',
      nombre: 'Jhon',
      apePaterno: 'Smith',
      apeMaterno: 'Brown',
      correoElectronico: 'Jhon.Smith@example.com',
      telefono: '+58912563278',
      rolUsuario: UserRole.MANAGER,
    },
    {rutUsuario: '1-1',
      contrasena: '',
      nombre: '',
      apePaterno: '',
      apeMaterno: '',
      correoElectronico: '',
      telefono: '',
      rolUsuario: UserRole.INVITADO,
    }
  ];
 // Filtrar por marca y precio si están presentes
 const resultado = usuarios.filter(usuarios => {
  return (
    (!rut || usuarios.rutUsuario == rut)
  );
});

if (resultado.length === 0) {
  throw new NotFoundException('Usuario(s) no encontrado(s).');
}

return JSON.stringify(resultado);

  }


  @ApiTags('Crear Usuarios')
  @ApiOperation({ summary: 'Crear nuevo usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario creado.' })
  @ApiResponse({ status: 409, description: 'Usuario ya existe.' })
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUsuarioDto: CreateUsuarioDto): string {
    const { rutUsuario } = createUsuarioDto;
    // Validar que el RUT no contenga solo espacios
    if (!rutUsuario.trim()) {
      throw new BadRequestException('El RUT no puede estar vacío o contener solo espacios en blanco');
    }

    return `Usuario con RUT: ${rutUsuario} creado con éxito.`;
  }

  @ApiTags('Actualizar Usuarios')
  @ApiOperation({ summary: 'Actualizar usuario por RUT' })
  @ApiBody({ type: ActualizaUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiParam({ name: 'rut', required: true, description: 'RUT del usuario' })
  @Put(':rut')
  @UsePipes(new ValidationPipe())
  update(@Param('rut') rut: string, @Body() actualizaUsuarioDto: ActualizaUsuarioDto): string {
    return `El usuario con rut: ${rut} se actualizó con éxito.`;
  }

  @ApiTags('Eliminar Usuarios')
  @ApiOperation({ summary: 'Eliminar usuario por su RUT' })
  @ApiBody({ type: EliminaUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiParam({ name: 'rut', required: true, description: 'RUT del usuario' })
  @Delete(':rut')
  remove(@Param() eliminaUsuarioDto: EliminaUsuarioDto): string {
    const { rut } = eliminaUsuarioDto;
    return `El  usuario  RUT: ${rut} fue eliminado con exito.`;
  }

}
