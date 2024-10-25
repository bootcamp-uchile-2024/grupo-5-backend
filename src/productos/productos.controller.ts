import {   Controller,   Get} from '@nestjs/common';
import { Producto } from './entities/producto.entity';
import { ProductoService } from './productos.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('consultas')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // Endpoint para obtener todos los productos
  @ApiTags('Buscar Catálogo de Productos')
  @ApiOperation({ summary: 'Obtener el catalogo de los productos' })
  @ApiResponse({ status: 200, description: 'Obtiene todos los productos.' })
  @ApiResponse({ status: 404, description: 'No se encontraron productos.' })
  @Get("productos")
  async findAll(): Promise<Producto[]> {
    console.log('Solicitando todos los productos...');
    const productos = await this.productoService.findAll();
    console.log('Productos devueltos al controlador:', productos); 
    return productos;

  }
}



