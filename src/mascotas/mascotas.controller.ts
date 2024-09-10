import {  Controller,   Get,   Post,   Body,   Patch,   Param,   Delete,   Put, Query, NotFoundException, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { Mascota } from './entities/mascota.entity';
import { MascotaDto } from './dto/read-mascota.dto';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { ActualizarMascotaDto } from './dto/update-mascota.dto';
import {   ApiBody,   ApiOperation,   ApiParam,   ApiQuery,   ApiResponse,   ApiTags } from '@nestjs/swagger';
import { EliminaMascotaDto } from './dto/delete-mascota.dto';

@Controller('mascotas')
export class MascotasController {
  // constructor(private readonly mascotasService: MascotasService) {}

  @ApiTags('Buscar Mascotas')
  //@ApiBody({ type: CreateMascotaDto })
  @ApiOperation({ summary: 'Obtener el listado de todos las mascotas registradas' })
  @ApiResponse({ status: 200, description: 'Obtiene todas las mascotas' })
  @ApiResponse({ status: 404, description: 'No se encontraron mascotas' })
  @ApiQuery({ name: 'rutUsuario', required: false, description: 'Rut Dueño Mascota' })
  @ApiQuery({ name: 'categoria', required: false, description: 'Categoría del Mascota' })
  @ApiQuery({ name: 'raza', required: false, description: 'Raza de la Mascota' })
  @Get()
  obtenerCatalogoMascotas(
    @Query('rutUsuario') rutUsuario: string, 
    @Query('categoria') categoria: string, 
    @Query('raza') raza: string, 
  ):string { //} Mascota[] {
    // Preguntar al profe cómo obtener resultados si el precio está vacio
    //  y usando el ParseIntPipe
    const mascotas = [{
      rutUsuario: '10234945-K',
      idMascota: 23535,
      nombre: 'Snoopy',
      edad: 2,
      categoria: 'Perro',
      raza: 'Beagle',
      imagen: '../imagenmascota/23535.jpg',
      afeccionesSalud: ['Rabia','Tiña'],
      preferencias: ['ProPlan','RoyalCanin']
    },
    {rutUsuario: '10234945-K',
      idMascota: 23,
      nombre: 'Choco',
      edad: 2,
      categoria: 'Perro',
      raza: 'Pastor Alemán',
      imagen: '../imagenmascota/23.jpg',
      afeccionesSalud: ['Parasitos'],
      preferencias: ['ProPlan','RoyalCanin']
    },
    {rutUsuario: '11111111-1',
      idMascota: 11,
      nombre: 'Atila',
      edad: 8,
      categoria: 'Perro',
      raza: 'Pitbull',
      imagen: '../imagenmascota/11.jpg',
      afeccionesSalud: ['Caries'],
      preferencias: ['Carne Cruda','Caballos Vivos']
    },
    {rutUsuario: '22222222-2',
      idMascota: 22,
      nombre: 'Misifus',
      edad: 7,
      categoria: 'Gato',
      raza: 'Angora',
      imagen: '../imagenmascota/2.jpg',
      afeccionesSalud: ['Parasitos'],
      preferencias: ['Whiskat','Proplan-Cat']
    }
  ];
    const resultado = mascotas.filter(mascota => {
      return (
        (!rutUsuario || mascota.rutUsuario.toLowerCase() === rutUsuario.toLowerCase()) && 
        (!categoria || mascota.categoria.toLowerCase() === categoria.toLowerCase()) && 
        (!raza || mascota.raza.toLowerCase() === raza.toLowerCase())
      );
    });
   
    if (resultado.length === 0) {
      throw new NotFoundException('Mascota(s) no encontrada(s).');
    }
   
    return JSON.stringify(resultado);
  }


  @ApiTags('Buscar Mascotas')
  @ApiParam({ name: 'rutUsuario', description: 'Rut dueño de la mascota' })
  @ApiResponse({ status: 200, description: 'Mascota encontrada' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  @ApiOperation({ summary: 'Obtener mascota por Rut del Dueño' })
  @Get(':rutUsuario')
  obtenerMascota(@Param('rutUsuario') rutUsuario: string): string  { //Mascota {}
    return `[{
      idMascota: 23,
      rutUsuario: '${rutUsuario}',      
      nombre: 'Choco',
      edad: 2,
      categoria: 'Perro',
      raza: 'Medio Pastor Alemán',
      imagen: '../imagenmascota/23.jpg',
      afeccionesSalud: ['Parasitos'],
      preferencias: ['ProPlan','RoyalCanin']
  }]`;
  }

  @ApiTags('Crear Mascotas')
  @ApiBody({ type: CreateMascotaDto  })
  @ApiResponse({ status: 200, description: 'Mascota creada con exito' })
  @ApiResponse({ status: 409, description: 'Mascota ya existe.' })
  @ApiOperation({ summary: 'Crear nueva mascota' })
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createMascotaDto: CreateMascotaDto): string {
    return 'Se ha registrado con exito la mascota.';
  }

  @ApiTags('Actualizar Mascotas')
  @ApiBody({ type: ActualizarMascotaDto  })
  @ApiResponse({ status: 200, description: 'Mascota actualizada' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  @ApiOperation({ summary: 'Actualizar mascota por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id de la mascota' })
  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number,
         @Body() actualizarMascotaDto: ActualizarMascotaDto): string {
    return `La mascota con id ${id} fue actualizada`;
  }

  @ApiTags('Eliminar Mascotas')
  @ApiBody({ type: EliminaMascotaDto })
  @ApiResponse({ status: 200, description: 'Mascota eliminada' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada.' })
  @ApiOperation({ summary: 'Eliminar mascota por Id' })
  @ApiParam({ name: 'rut', required: true, description: 'Rut del dueño de la Mascota' })
  @ApiParam({ name: 'id', required: true, description: 'Id de la mascota' })
  @Delete(':rut/:id')
  remove(@Param('rut') rut: string, @Param('id') id: string): string {
    if (rut && id) {
      return `La mascota con ID ${id} del dueño con RUT ${rut} fue eliminada`;
    } else {
      throw new NotFoundException('Mascota o dueño no encontrados.');
    }
  }

}
