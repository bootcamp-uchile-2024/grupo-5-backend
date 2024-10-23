import { BadRequestException, Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from '../app.service';
import { ConexionService } from './conexion.service';
import { CatalogoProductoDto } from 'src/productos/dto/read-catalogo-productos.dto';

@Controller("consultas")
export class ConexionController {
  constructor(private readonly conexionService: ConexionService) {}

  @Get("estudiantes")
  async obtenerProductos() : Promise<CatalogoProductoDto[]> {
    const estudiantes : CatalogoProductoDto[] = await this.conexionService.obtenerProductos();
    return estudiantes;
  }


}
