import {   Controller,   Get,   Post,   Body,   Patch,   Param,   Delete,   Put , NotFoundException, UsePipes, ValidationPipe} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ActualizarProductoDto } from './dto/update-producto.dto';
import {   ApiBody,   ApiOperation,   ApiParam,   ApiResponse,   ApiTags } from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';
import { CatalogoProductoDto } from './dto/read-catalogo-productos.dto';
import { DetalleProductoDto } from './dto/read-detalle-producto.dto';



@Controller('productos')
export class ProductosController {
   // constructor(private readonly productosService: ProductosService) {}


  @ApiTags('Buscar Catálogo de Productos')
  @ApiResponse({ status: 200, description: 'Obtiene todos los productos.' })
  @ApiResponse({ status: 404, description: 'No se encontraron productos.' })
  @ApiOperation({ summary: 'Obtener el catalogo de los productos' })
  @Get()
  obtenerCatalogo(): CatalogoProductoDto[] {
    return [
      {
          id: 2431,
          nombre: 'Proplan Cachorro',
          marca: 'Proplan',
          precio: 30000,
          imagenes: ['images/proplan1.jpg', 'images/proplan2.jpg']
      },
      {
        id: 2653,
        nombre: 'Royal Canin Adulto',
        marca: 'Royal Canin',
        precio: 85000,
        imagenes: ['images/2653_001.jpg', 'images/2653_002.jpg']
    },
    ];
  }


  @ApiTags('Buscar Detalle de Producto')
  @ApiParam({ name: 'id', description: 'Id del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Obtener producto por Id' })
  @Get(':id')
  buscarDetalleProducto(@Param('id') id: string): string { //DetalleProductoDto {
    return `{
      id:${id} ,
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
      }`;
  }


  @ApiTags('Crear Producto')
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({ status: 200, description: 'Producto creado con éxito' })
  @ApiResponse({ status: 409, description: 'Producto ya existe.' })
  @ApiOperation({ summary: 'Crear nuevo producto' })
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
  update(@Param('id') id: string, @Body() actualizarProductoDto: ActualizarProductoDto): string {
    return `El producto ${id} fue actualizado con éxito.`;
  }

  @ApiTags('Eliminar Producto')
  @ApiResponse({ status: 200, description: 'Producto eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Eliminar producto por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id del producto.' })
  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `El producto ${id} fue eliminado con éxito.`;
  }






}
