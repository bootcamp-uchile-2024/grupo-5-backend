import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Put 
} from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { 
  ApiBody, 
  ApiOperation, 
  ApiParam, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';

@Controller('mascotas')
export class MascotasController {
  // constructor(private readonly mascotasService: MascotasService) {}

  @ApiTags('Buscar Mascotas')
  @ApiResponse({ status: 200, description: 'Obtiene todas las mascotas' })
  @ApiResponse({ status: 404, description: 'No se encontraron mascotas' })
  @ApiOperation({ summary: 'Obtener el listado de todos las mascotas' })
  @Get()
  findAll(): string {
    return 'Este método retorna todos las mascotas';
  }

  @ApiTags('Buscar Mascotas')
  @ApiParam({ name: 'id', description: 'Id de la mascota' })
  @ApiResponse({ status: 200, description: 'Mascota encontrada' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  @ApiOperation({ summary: 'Obtener mascota por Id' })
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `Este método retorna la mascota por su id: ${id}`;
  }

  @ApiTags('Crear Mascotas')
  @ApiBody({ type: CreateMascotaDto })
  @ApiResponse({ status: 200, description: 'Mascota creada' })
  @ApiResponse({ status: 409, description: 'Mascota ya existe.' })
  @ApiOperation({ summary: 'Crear nueva mascota' })
  @Post()
  create(@Body() createItemDto: any): string {
    return 'Este método crea una nueva mascota.';
  }

  @ApiTags('Actualizar Mascotas')
  @ApiBody({ type: CreateMascotaDto })
  @ApiResponse({ status: 200, description: 'Mascota actualizada' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  @ApiOperation({ summary: 'Actualizar mascota por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id de la mascota' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateMascotaDto): string {
    return `Este método actualiza la mascota por su id: ${id}`;
  }

  @ApiTags('Eliminar Mascotas')
  @ApiResponse({ status: 200, description: 'Mascota eliminada' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  @ApiOperation({ summary: 'Eliminar mascota por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id de la mascota' })
  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `Este método elimina una mascota por su Id: ${id}`;
  }
}
