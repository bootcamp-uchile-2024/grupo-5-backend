import {   Controller,   Get,   Post,   Body,   Patch,   Param,   Delete,   Put , NotFoundException} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoDetalleDto } from './dto/create-producto-detalle.dto';
import {   ApiBody,   ApiOperation,   ApiParam,   ApiResponse,   ApiTags } from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';



@Controller('productos')
export class ProductosController {
   // constructor(private readonly productosService: ProductosService) {}

  @ApiTags('Buscar Productos')
  @ApiResponse({ status: 200, description: 'Obtiene todos los productos.' })
  @ApiResponse({ status: 404, description: 'No se encontraron productos.' })
  @ApiOperation({ summary: 'Obtener el listado de todos los productos' })
  @Get()
  findAll(): ProductoDto[] {
    return [
      {
          id: 2431,
          nombre: 'Firulais - Cachorro',
          descripcion: '10 Kilos - Carne de Salmon',
          precio: 30000,
          etiquetas: ['Cachorro'],
          categoria: 'Comida para cachorros',
          stock: 3
      },
      {
          id: 111,
          nombre: 'Royal Canin',
          descripcion: 'Royal Canin Adulto Chihuahua 1Kg',
          precio: 10600,
          etiquetas: ['Perro Adulto'],
          categoria: 'Comida para perros Chihuahua',
          stock: 10
      }
  ];
  }

  @ApiTags('Buscar Productos')
  @ApiParam({ name: 'id', description: 'Id del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Obtener producto por Id' })
  @Get(':id')
  findOne(@Param('id') id: string): ProductoDto[] {
    return [
      {
          id: 2431,
          nombre: 'Proplan',
          descripcion: '10 Kilos - Carne de Salmon',
          precio: 30000,
          etiquetas: ['Perro', 'Cachorro'],
          categoria: 'Comida para perros',
          stock: 3
      },
    ];
  }


  @ApiTags('Crear Productos')
  @ApiBody({ type: ProductoDto })
  @ApiResponse({ status: 200, description: 'Producto creado.' })
  @ApiResponse({ status: 409, description: 'Producto ya existe.' })
  @ApiOperation({ summary: 'Crear nuevo producto' })
  @Post()
  create(@Body() createItemDto: any): string {
    return 'Producto ingresado con exito.';
  }


  @ApiTags('Actualizar Productos')
  @ApiBody({ type: ProductoDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Actualizar producto por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id del producto' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateProductoDto): string {
    return `Fue actualizado con exito el producto ${id}`;
  }

  @ApiTags('Eliminar Productos')
  @ApiResponse({ status: 200, description: 'Producto eliminado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Eliminar producto por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id del producto.' })
  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `Fue eliminado con exito el producto ${id}`;
  }



  @ApiTags('Crear Detalle del Productos')
  @ApiBody({ type: ProductoDetalleDto })
  @ApiResponse({ status: 200, description: 'Detalle creado.' })
  @ApiResponse({ status: 404, description: 'Producto no existe.' })
  @ApiResponse({ status: 409, description: 'Detalle de producto ya existe.' })
  @ApiOperation({ summary: 'Asignar un detalle a un producto' })
  @Post()
  createDetail(@Body() ProductoDetalleDto: any): string {
    return 'Este método crea un nuevo detalle producto.';
  }


  @ApiTags('Buscar Detalle Productos')
  @ApiParam({ name: 'id', description: 'Id del producto' })
  @ApiResponse({ status: 200, description: 'Detalle producto encontrado.' })
  @ApiResponse({ status: 404, description: 'El producto no posee detalle.' })
  @ApiOperation({ summary: 'Obtener producto por Id' })
  @Get(':id')
  findOneDetail(@Param('id') id: number): ProductoDetalleDto {
    return 
      {
          id: 2431;
          ingredientes: ['Pollo', 'Maiz'];
          tamanio: '10 Kilos';
          marca: 'Firulais';
          origen: 'Checoslovaco';
          vidaUtil: '12 meses';
          recomendacionesUso: 'Solo para cachorros';
          contenidoNeto: '10020 gramos';
          instruccionesAlmacenamiento: 'Dejar en lugar fresco';
          codigoBarras: '8757420684'
      }
  }


}
