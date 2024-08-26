import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

@ApiResponse({ status: 200, description: 'Obtiene la mascota' })
@ApiResponse({ status: 404, description: 'La mascota no existe.' })
  @Get('nombre')
  obtenerNombreModulo(): string {
    return 'Mascotas';
  }
}
