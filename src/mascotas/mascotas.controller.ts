import {  Controller,   Get,   Post,   Body,   Patch,   Param,   Delete,   Put } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { Mascota } from './entities/mascota.entity';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { CreateMascotaDtoSal } from './dto/create-mascota-sal.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import {   ApiBody,   ApiOperation,   ApiParam,   ApiResponse,   ApiTags } from '@nestjs/swagger';

@Controller('mascotas')
export class MascotasController {
  // constructor(private readonly mascotasService: MascotasService) {}

  @ApiTags('Buscar Mascotas')
  @ApiResponse({ status: 200, description: 'Obtiene todas las mascotas' })
  @ApiResponse({ status: 404, description: 'No se encontraron mascotas' })
  @ApiOperation({ summary: 'Obtener el listado de todos las mascotas' })
  @Get()
  findAll(): Mascota[] {
    return [{
      rutUsuario: '10234945-K',
      idMascota: 23535,
      nombre: 'Snoopy',
      edad: 2,
      raza: 'Beagle',
      imagen: '../imagenmascota/23535.jpg',
      afeccionesSalud: ['Rabia','Tiña'],
      preferencias: ['ProPlan','RoyalCanin']
    },
    {rutUsuario: '13257114-1',
      idMascota: 23,
      nombre: 'Choko',
      edad: 2,
      raza: 'Pastor Alemán',
      imagen: '../imagenmascota/23.jpg',
      afeccionesSalud: ['Parasitos'],
      preferencias: ['ProPlan','RoyalCanin']
    }];
  }

  @ApiTags('Buscar Mascotas')
  @ApiParam({ name: 'id', description: 'Id de la mascota' })
  @ApiResponse({ status: 200, description: 'Mascota encontrada' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  @ApiOperation({ summary: 'Obtener mascota por Id' })
  @Get(':id')
  findOne(@Param('id') id: string): string  {
    return `[{
      idMascota: ${id},
      rutUsuario: '13257114-1',      
      nombre: 'Shoko',
      edad: 2,
      raza: 'Pastor Alemán',
      imagen: '../imagenmascota/23.jpg',
      afeccionesSalud: ['Parasitos'],
      preferencias: ['ProPlan','RoyalCanin']
  }]`;
  }

  @ApiTags('Crear Mascotas')
  @ApiBody({ type: CreateMascotaDto })
  @ApiResponse({ status: 200, description: 'Mascota creada' })
  @ApiResponse({ status: 409, description: 'Mascota ya existe.' })
  @ApiOperation({ summary: 'Crear nueva mascota' })
  @Post()
  create(@Body() createItemDto: any): string {
    return 'Se ha registrado con exito la mascota.';
  }

  @ApiTags('Actualizar Mascotas')
  @ApiBody({ type: CreateMascotaDto })
  @ApiResponse({ status: 200, description: 'Mascota actualizada' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  @ApiOperation({ summary: 'Actualizar mascota por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id de la mascota' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateMascotaDto): string {
    return `La mascota con id ${id} fue actualizada`;
  }

  @ApiTags('Eliminar Mascotas')
  @ApiResponse({ status: 200, description: 'Mascota eliminada' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  @ApiOperation({ summary: 'Eliminar mascota por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id de la mascota' })
  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `La mascota con id ${id} fue eliminada`;
  }


  //Dto de Salida

  @ApiTags('Buscar Mascotas')
  @ApiOperation({ summary: 'Obtener el listado de todas las mascotas' })
  @ApiResponse({ status: 200, description: 'Obtiene todos las mascotas', type: CreateMascotaDtoSal, }) // Referencia al DTO de salida
  @ApiResponse({ status: 404, description: 'No se encontraron Mascotas' })
  @Get()
  findAllOut(): CreateMascotaDtoSal[] {
    // Simulación de retorno de datos (debería ser reemplazado por la lógica real)
    return [{
      rutUsuario: '10234945-K',
      idMascota: 23535,
      nombre: 'Snoopy',
      edad: 2,
      raza: 'Beagle',
      imagen: './images/Snoopy.jpg',
      afeccionesSalud: ['Rabia','Tiña'],
      preferencias: ['ProPlan','RoyalCanin'],
     //historialClinico: ['Picadura Insecto','Cortar la cola']
    }];
  }

}
