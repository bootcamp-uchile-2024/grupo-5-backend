import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { EliminaUsuarioDto } from './dto/delete-usuario.dto';
import { ActualizaUsuarioDto } from './dto/update-usuario.dto';
import { UserRole } from './roles.enum';
import { UsuariosService } from './usuarios.service';
import { ActivaUsuarioDto } from './dto/react-usuario.dto';

@Controller('usuarios')

  export class UsuarioController {
    constructor(private readonly usuarioService: UsuariosService) {}

  @ApiTags('Buscar Usuarios')
  @ApiOperation({ summary: 'Obtener el listado de todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Obtiene todos los usuarios' })
  @ApiResponse({ status: 404, description: 'No se encontraron usuarios' })
  @ApiQuery({ name: 'rolUsuario', required: false, description: 'Rol del Usuario', enum: UserRole })
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de todos los usuarios.' })
  async findAll() {
    return await this.usuarioService.findAll();
  }


  @ApiTags('Buscar Usuarios')
  @ApiOperation({ summary: 'Obtener usuario por rut del Usuario' })
  @ApiParam({ name: 'rut', description: 'Rut del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':rut')
  async findOne(@Param('rut') rut: string) {
    return await this.usuarioService.findOne(rut);
  }


  @ApiTags('Crear Usuarios')
  @ApiOperation({ summary: 'Crear nuevo usuario',
    description: 'HU 1.1 - Formulario de registro de usuario: Como nuevo usuario, quiero un formulario de registro que sea fácil de completar y que solicite solo la información necesaria sobre mí y mis mascotas, para crear mi cuenta rápidamente'})
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario creado.' })
  @ApiResponse({ status: 409, description: 'Usuario ya existe.' })
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'El usuario ha sido creado.' })
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.create(createUsuarioDto);
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


  @ApiTags('Activar Usuario')
  @ApiOperation({ summary: 'Activar usuario por su RUT' })
  @ApiBody({ type: ActivaUsuarioDto })
  @ApiResponse({ status: 200, description: 'Se Activa Usuario.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiParam({ name: 'rut', required: true, description: 'RUT del usuario' })
  @Delete(':rut')
  reactivate(@Param() activaUsuarioDto: ActivaUsuarioDto): string {
    const { rut } = activaUsuarioDto;
    return `El  usuario  RUT: ${rut} fue activado con exito.`;
  }
}
