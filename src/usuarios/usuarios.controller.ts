import { Controller, Get, Post, Body, Patch, Param, Delete, Put,  } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';




@Controller('Usuarios')
export class UsuariosController {
  
  @ApiTags('Buscar Usuarios')
  @ApiResponse({ status: 200, description: 'Obtiene todos los usuarios' })
  @ApiResponse({ status: 404, description: 'No se encontraron usuarios' })
  @ApiOperation({summary:'Obtener el listado de todos los usuarios'})
  @Get()
  findAll(): string {
    return 'Este método retorna todos los usuarios';
  }

  @ApiTags('Buscar Usuarios')
  @ApiParam({name:'id', description: 'Número de rut del usuario'})
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiOperation({summary:'Obtener usuario por Id'})
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return 'Este método retorna el usuario con id: ${id}';
  }

  @ApiTags('Crear Usuarios')
  @ApiResponse({ status: 200, description: 'Usuario creado' })
  @ApiResponse({ status: 409, description: 'Usuario ya existe.' })
  @ApiOperation({summary:'Crear nuevo usuario'})
  @Post()
  create(@Body() createItemDto: any): string {
    return 'Este método crea un nuevo usuario.';
  }

  @ApiTags('Actualizar Usuarios')
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiOperation({summary:'Actualizar usuario por Id'})
  @ApiParam ({name:':id', required: true, description: 'Número de rut del usuario'})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: any): string {
    return 'Este método actualiza el usuario con id: ${id}';
  }
  @ApiTags('Eliminar Usuarios')
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiOperation({summary:'Eliminar usuario por Id'})
  @ApiParam ({name:':id', required: true, description: 'Número de rut del usuario'})
  @Delete(':id')
  remove(@Param('id') id: string): string {
    return 'Este método elimina el usuario con id: ${id}';
  }
}
