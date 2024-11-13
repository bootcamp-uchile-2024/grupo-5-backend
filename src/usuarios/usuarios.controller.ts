import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { EliminaUsuarioDto } from './dto/delete-usuario.dto';
import { ActivaUsuarioDto } from './dto/react-usuario.dto';
import { ActualizaUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @ApiTags('Buscar Usuarios')
  @ApiOperation({
    summary: 'HU 1.1.1: Obtener el listado de todos los usuarios',
    description:
      '<strong>HU 1.1.1 - Obtener el listado de todos los usuarios: </strong>Como administrador, quiero poder listar todos los usuarios disponibles en el sistema para tener una visión completa de los perfiles activos, facilitar la gestión de roles y permisos, y mantener el control sobre el acceso y el estado de cada cuenta.',
  })
  @ApiResponse({ status: 200, description: 'Obtiene todos los usuarios' })
  @ApiResponse({ status: 404, description: 'No se encontraron usuarios' })
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de todos los usuarios.' })
  async findAll() {
    return await this.usuarioService.findAll();
  }

  @ApiTags('Buscar Usuarios')
  @ApiOperation({
    summary: 'HU 1.1.2: Obtener Usuario por RUT',
    description:
      '<strong>HU 1.1.2 - Obtener Usuario por RUT:<strong> Como administrador quiero poder buscar usuario por RUT para agilizar la localización de un usuario específico y gestionar de manera eficiente su perfil, permisos y estado en el sistema.',
  })
  @ApiParam({ name: 'rut', description: 'Rut del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':rut')
  async findOne(@Param('rut') rut: string) {
    return await this.usuarioService.findOne(rut);
  }

  @ApiTags('Crear Usuarios')
  @ApiOperation({
    summary: 'HU 1.1: Crear Nuevo Usuario',
    description:
      '<strong>HU 1.1 - Formulario de Registro de Usuario:</strong> Como nuevo usuario, quiero un formulario de registro que sea fácil de completar y que solicite solo la información necesaria sobre mí y mis mascotas, para crear mi cuenta rápidamente',
  })
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
  @ApiOperation({
    summary: 'HU 1.1.3: Actualizar usuario por RUT',
    description:
      '<strong>HU 1.1.3 - Actualizar Datos de Usuario por RUT:</strong> Como administrador, quiero poder actualizar los datos de un usuario utilizando su RUT para mantener la información actualizada y asegurar la precisión de los datos en el sistema.',
  })
  @ApiBody({ type: ActualizaUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  // @ApiParam({ name: 'rut', required: true, description: 'RUT del usuario' })
  @Put(':rut')
  @UsePipes(new ValidationPipe())
  update(
    @Param('rut') rut: string,
    @Body() actualizaUsuarioDto: ActualizaUsuarioDto,
  ): string {
    return `El usuario con rut: ${rut} se actualizó con éxito.`;
  }

  @ApiTags('Eliminar Usuarios')
  @ApiOperation({
    summary: 'HU 1.1.4: Eliminar usuario por su RUT',
    description:
      '<strong>HU 1.1.4 - Eliminar Usuario por RUT: </trong>Como administrador, quiero poder eliminar un usuario por su RUT para poder gestionar el acceso y mantener el sistema libre de usuarios no deseados o que ya no están activos.',
  })
  @ApiBody({ type: EliminaUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiParam({ name: 'rut', required: true, description: 'RUT del usuario', example: '10234945-K' })
  @Delete(':rut')
  remove(@Param('rut') eliminaUsuarioDto: EliminaUsuarioDto): string {
    const { rut } = eliminaUsuarioDto;
    return `El  usuario  RUT: ${rut} fue eliminado con éxito.`;
  }

  @ApiTags('Activar Usuario')
  @ApiOperation({
    summary: 'HU 1.1.5: Activar Usuario por su RUT',
    description:
      '<strong>HU 1.1.5 - Activar Usuario por su RUT: </strong> Como administrador, quiero poder activar y desactivar usuarios por su RUT para gestionar el acceso de los usuarios a la plataforma de manera eficiente, permitiendo que los usuarios reactiven su cuenta cuando sea necesario o desactivarlas temporalmente si no deben tener acceso.',
  })
  @ApiBody({ type: ActivaUsuarioDto })
  @ApiResponse({ status: 200, description: 'Se Activa Usuario.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiParam({ name: 'rut', required: true, description: 'RUT del usuario', example: '10234945-K' })
  @Patch(':rut')
  reactivate(@Param('rut') activaUsuarioDto: ActivaUsuarioDto): string {
    const { rut } = activaUsuarioDto;
    return `El  usuario  RUT: ${rut} fue activado con éxito.`;
  }
}
