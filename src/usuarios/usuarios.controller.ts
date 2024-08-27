import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put 
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { 
  ApiBody, 
  ApiOperation, 
  ApiParam, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';

@Controller('Usuarios')
export class UsuariosController {

  @ApiTags('Buscar Usuarios')
  @ApiResponse({ status: 200, description: 'Obtiene todos los usuarios' })
  @ApiResponse({ status: 404, description: 'No se encontraron usuarios' })
  @ApiOperation({ summary: 'Obtener el listado de todos los usuarios' })
  @Get()
  findAll(): string {
    return 'Este método retorna todos los usuarios';
  }

  @ApiTags('Buscar Usuarios')
  @ApiParam({ name: 'rut', description: 'Rut del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiOperation({ summary: 'Obtener usuario por Rut' })
  @Get(':rut')
  findOne(@Param('rut') rut: string): string {
    return `Este método retorna el usuario con rut: ${rut}`;
  }

  @ApiTags('Crear Usuarios')
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario creado' })
  @ApiResponse({ status: 409, description: 'Usuario ya existe.' })
  @ApiOperation({ summary: 'Crear nuevo usuario' })
  @Post()
  create(@Body() createItemDto: any): string {
    return 'Este método crea un nuevo usuario.';
  }

  @ApiTags('Actualizar Usuarios')
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiOperation({ summary: 'Actualizar usuario por Rut' })
  @ApiParam({ name: 'rut', required: true, description: 'Rut del usuario' })
  @Put(':rut')
  update(@Param('rut') rut: string, @Body() updateItemDto: UpdateUsuarioDto): string {
    return `Este método actualiza el usuario con rut: ${rut}`;
  }

  @ApiTags('Eliminar Usuarios')
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiOperation({ summary: 'Eliminar usuario por su Rut' })
  @ApiParam({ name: 'rut', required: true, description: 'Rut del usuario' })
  @Delete(':rut')
  remove(@Param('rut') rut: string): string {
    return `Este método elimina un usuario por su rut: ${rut}`;
  }
}
