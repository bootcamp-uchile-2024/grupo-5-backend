import {   Controller,   Get,   Post,   Body,   Param,   Delete,   Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { CreateUsuarioDtoSal } from './dto/create-usuario-sal.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {   ApiBody,   ApiOperation,   ApiParam,   ApiResponse,   ApiTags } from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';
import { UserRole } from './entities/rol';

@Controller('Usuarios')
export class UsuariosController {

  @ApiTags('Buscar Usuarios')
  @ApiOperation({ summary: 'Obtener el listado de todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Obtiene todos los usuarios' })
  @ApiResponse({ status: 404, description: 'No se encontraron usuarios' })
  @Get()
  findAll(): Usuario[] {
    //return 'Este método retorna todos los usuarios';
    return [{
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
      rolUsuario: UserRole.AMINISTRADOR,
    }];
  }

  @ApiTags('Buscar Usuarios')
  @ApiOperation({ summary: 'Obtener usuario por RUT' })
  @ApiParam({ name: 'rut', description: 'RUT del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':rut')
  findOne(@Param('rut') rut: string): string {
    return `[{
      rutUsuario: ${rut},
      contrasena: 'atila123',
      nombre: 'Atila',
      apePaterno: 'El',
      apeMaterno: 'Grande',
      correoElectronico: 'atila.el.grande@example.com',
      telefono: '+56911111111',
    }]`;
  }

  @ApiTags('Crear Usuarios')
  @ApiOperation({ summary: 'Crear nuevo usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario creado.' })
  @ApiResponse({ status: 409, description: 'Usuario ya existe.' })
  @Post()
  create(@Body() createItemDto: any): string {
    return 'Usuario ingresado con exito.';
  }

  @ApiTags('Actualizar Usuarios')
  @ApiOperation({ summary: 'Actualizar usuario por RUT' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiParam({ name: 'rut', required: true, description: 'RUT del usuario' })
  @Put(':rut')
  update(@Param('rut') rut: string, @Body() updateItemDto: UpdateUsuarioDto): string {
    return `Se actualiza el usuario con rut: ${rut} con éxito.`;
  }

  @ApiTags('Eliminar Usuarios')
  @ApiOperation({ summary: 'Eliminar usuario por su RUT' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiParam({ name: 'rut', required: true, description: 'RUT del usuario' })
  @Delete(':rut')
  remove(@Param('rut') rut: string): string {
    return `Este método elimina un usuario por su rut: ${rut}`;
  }

// Dto de Salida

  @ApiTags('Buscar Usuarios')
  @ApiOperation({ summary: 'Obtener el listado de todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Obtiene todos los usuarios.', type: CreateUsuarioDtoSal, }) // Referencia al DTO de salida
  @ApiResponse({ status: 404, description: 'No se encontraron usuarios.' })
  @Get()
  findAllOut(): CreateUsuarioDtoSal[] {
    // Simulación de retorno de datos (debería ser reemplazado por la lógica real)
    return [{
      rutUsuario: '10234945-K',
      contrasena: 'password123',
      nombre: 'Juan',
      apePaterno: 'Pérez',
      apeMaterno: 'González',
      correoElectronico: 'juan.perez@example.com',
      telefono: '+56912345678',
      // preferencias: [],
      // historialCompras: [],
      // mascotas: [],
      // notificaciones: [],
    }];
  }

  @ApiTags('Buscar Usuarios')
  @ApiOperation({ summary: 'Obtener usuario por RUT' })
  @ApiParam({ name: 'rut', description: 'RUT del usuario' })
  @ApiResponse({    status: 200,    description: 'Usuario encontrado.',    type: CreateUsuarioDtoSal,  }) // Referencia al DTO de salida
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':rut')
  findOneOut(@Param('rut') rut: string): CreateUsuarioDtoSal {
    // Simulación de retorno de datos (debería ser reemplazado por la lógica real)
    return {
      rutUsuario: rut,
      contrasena: 'password123',
      nombre: 'Juan',
      apePaterno: 'Pérez',
      apeMaterno: 'González',
      correoElectronico: 'juan.perez@example.com',
      telefono: '+56912345678',
      // preferencias: [],
      // historialCompras: [],
      // mascotas: [],
      // notificaciones: [],
    };
  }

  @ApiTags('Crear Usuarios')
  @ApiOperation({ summary: 'Crear nuevo usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario creado.', type: CreateUsuarioDtoSal,   }) // Referencia al DTO de salida
  @ApiResponse({ status: 409, description: 'Usuario ya existe.' })
  @Post()
  createOut(@Body() createItemDtoSal: CreateUsuarioDtoSal): CreateUsuarioDtoSal {
    // Simulación de retorno de datos (debería ser reemplazado por la lógica real)
    return {
      rutUsuario: '10234945-K',
      contrasena: 'password123',
      nombre: 'Juan',
      apePaterno: 'Pérez',
      apeMaterno: 'González',
      correoElectronico: 'juan.perez@example.com',
      telefono: '+56912345678',
      // preferencias: [],
      // historialCompras: [],
      // mascotas: [],
      // notificaciones: [],
    };
  }

//  @ApiTags('Actualizar Usuarios')
//  @ApiBody({ type: UpdateUsuarioDto })
//  @ApiResponse({
//    status: 200,
//    description: 'Usuario actualizado',
//    type: CreateUsuarioDtoSal, // Referencia al DTO de salida
//  })

  // @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  // @ApiOperation({ summary: 'Actualizar usuario por RUT' })
  // @ApiParam({ name: 'rut', required: true, description: 'RUT del usuario' })
  // @Put(':rut')
  // updateOut(@Param('rut') rut: string, @Body() updateItemDto: UpdateUsuarioDto): CreateUsuarioDtoSal {
    // // Simulación de retorno de datos (debería ser reemplazado por la lógica real)
    // return {
      // rutUsuario: rut,
      // contrasena: updateItemDto.contrasena,
      // nombre: updateItemDto.nombre,
      // apePaterno: updateItemDto.apePaterno,
      // apeMaterno: updateItemDto.apeMaterno,
      // correoElectronico: updateItemDto.correoElectronico,
      // telefono: updateItemDto.telefono,
      //  preferencias: [],
      //  historialCompras: [],
      //  mascotas: [],
      //  notificaciones: [],
    // };
  // }

  @ApiTags('Eliminar Usuarios')
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiOperation({ summary: 'Eliminar usuario por su RUT' })
  @ApiParam({ name: 'rut', required: true, description: 'RUT del usuario' })
  @Delete(':rut')
  removeOut(@Param('rut') rut: string): string {
    return `Este método elimina un usuario por su rut: ${rut}`;
  }
}
