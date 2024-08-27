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
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { 
  ApiBody, 
  ApiOperation, 
  ApiParam, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';

@Controller('productos')
export class ProductosController {
  // constructor(private readonly productosService: ProductosService) {}

  @ApiTags('Buscar Productos')
  @ApiResponse({ status: 200, description: 'Obtiene todos los productos.' })
  @ApiResponse({ status: 404, description: 'No se encontraron productos.' })
  @ApiOperation({ summary: 'Obtener el listado de todos los productos' })
  @Get()
  findAll(): string {
    return 'Este método retorna todos los productos.';
  }

  @ApiTags('Buscar Productos')
  @ApiParam({ name: 'id', description: 'Id del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Obtener producto por Id' })
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `Este método retorna el producto por su id: ${id}`;
  }

  @ApiTags('Crear Productos')
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({ status: 200, description: 'Producto creado.' })
  @ApiResponse({ status: 409, description: 'Producto ya existe.' })
  @ApiOperation({ summary: 'Crear nuevo producto' })
  @Post()
  create(@Body() createItemDto: any): string {
    return 'Este método crea un nuevo producto.';
  }

  @ApiTags('Actualizar Productos')
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Actualizar producto por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id del producto' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateProductoDto): string {
    return `Este método actualiza el producto por su id: ${id}`;
  }

  @ApiTags('Eliminar Productos')
  @ApiResponse({ status: 200, description: 'Producto eliminado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Eliminar producto por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id del producto.' })
  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `Este método elimina un producto por su Id: ${id}`;
  }
}
