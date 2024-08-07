import { Controller, Get, Param } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoDto, AreaDto, EcommerceDto } from './dto/create-equipo.dto';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Get()
  obtenerEquipo(): EquipoDto {
    return this.equipoService.obtenerEquipo();
  }

  @Get('area/:nombre')
  obtenerAreaPorNombre(@Param('nombre') nombre: string): { area?: AreaDto; mensaje?: string } {
    return this.equipoService.obtenerAreaPorNombre(nombre);
  }

  @Get('areas')
  obtenerTodasLasAreas(): AreaDto[] {
    return this.equipoService.obtenerTodasLasAreas();
  }

  @Get('ecommerce')
  obtenerDatosEcommerce(): EcommerceDto {
    return this.equipoService.obtenerDatosEcommerce();
  }
}