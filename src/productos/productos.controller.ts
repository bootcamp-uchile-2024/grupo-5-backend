import {   Body, Controller,   Delete,   Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { Producto } from './entities/producto.entity';
import { ProductoService } from './productos.service'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DetalleProductoDto } from './dto/read-detalle-producto.dto';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ActualizarProductoDto } from './dto/update-producto.dto';


@Controller()
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // Endpoint para obtener todos los productos
  @ApiTags('Obtener Catálogo de Productos')
  @ApiOperation({ summary: 'Obtener el catalogo de los productos' })
  @ApiResponse({ status: 200, description: 'Obtiene todos los productos.' })
  @ApiResponse({ status: 404, description: 'No se encontraron productos.' })
  @Get("productos")
  findAll(){
    return this.productoService.findAll();
  }


  @ApiTags('Obtener Detalle de Producto')
  @ApiParam({ name: 'id', description: 'Id del Producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Obtener producto por Id' })
  @Get(':id')
  buscarDetalleProducto(@Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number) { //DetalleProductoDto {
    return {
      id: {id} ,
      nombre: 'Royal Canin Medium Puppy Alimento para Perro',
      marca: 'Royal Canin',
      descripcion: 'Royal Canin Medium Puppy es un alimento para cachorros de razas medianas (11 a 25 Kg peso adulto) hasta los 12 meses de edad. Proporciona una combinación exclusiva de nutrientes que garantizan una seguridad digestiva óptima y favorecen el equilibrio de la flora intestinal con prebióticos.',
      precio: 86990,
      imagenes: ['images/2653_001.jpg', 'images/2653_002.jpg'],
      etiquetas: ['Royal Canin', 'Cachorros', 'Razas medianas', 'Prebióticos'],
      categoria: 'Alimento Seco Perros',
      stock: 150,
      ingredientes: 'Maíz, harina de subproductos de pollo, grasas animales, proteína vegetal purificada, arroz, harina de trigo, pulpa de remolacha, vitaminas, aceite de pescado.',
      tamanio: '15 Kg',
      origen: 'Francia',
      vidaUtil: '12 meses',
      recomendacionesUso: 'Solo para cachorros de razas medianas hasta 12 meses de edad'
      };
  }


  @ApiTags('Crear Producto')
  @ApiOperation({ summary: 'Crear nuevo producto' })
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({ status: 200, description: 'Producto creado con éxito' })
  @ApiResponse({ status: 409, description: 'Producto ya existe.' })
  @Post()
  @UsePipes(new ValidationPipe())
  createProduct(@Body() createProductoDto: CreateProductoDto): string {
    return 'Producto creado con éxito.';
  }


  @ApiTags('Actualizar Producto')
  @ApiBody({ type: ActualizarProductoDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Actualizar producto por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id del producto' })
  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number, 
         @Body() actualizarProductoDto: ActualizarProductoDto): string {
    return `El producto ${id} fue actualizado con éxito.`;
  }

  @ApiTags('Eliminar Producto')
  @ApiResponse({ status: 200, description: 'Producto eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Eliminar producto por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id del producto.' })
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number): string {
    return `El producto ${id} fue eliminado con éxito.`;
  }


}



