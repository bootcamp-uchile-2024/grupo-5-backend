import {   Controller,   Get,   Post,   Body,   Patch,   Param,   Delete,   Put , NotFoundException, UsePipes, ValidationPipe, Query, ParseIntPipe} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ActualizarProductoDto } from './dto/update-producto.dto';
import {   ApiBody,   ApiOperation,   ApiParam,   ApiQuery,   ApiResponse,   ApiTags } from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';
import { CatalogoProductoDto } from './dto/read-catalogo-productos.dto';
import { DetalleProductoDto } from './dto/read-detalle-producto.dto';
import { query } from 'express';



@Controller('productos')
export class ProductosController {
   // constructor(private readonly productosService: ProductosService) {}


  @ApiTags('Buscar Catálogo de Productos')
  @ApiOperation({ summary: 'Obtener el catalogo de los productos' })
  @ApiResponse({ status: 200, description: 'Obtiene todos los productos.' })
  @ApiResponse({ status: 404, description: 'No se encontraron productos.' })
  @ApiQuery({ name: 'marca', required: false, description: 'Marca del producto' })
  @ApiQuery({ name: 'precio', required: false, description: 'Precio del producto' })
  @Get()
  obtenerCatalogo(
    @Query('marca') marca: string, 
    @Query('precio', new ParseIntPipe({errorHttpStatusCode: 400 })) precio: number): string{ // CatalogoProductoDto[] {
      // Preguntar al profe cómo obtener resultados si el precio está vacio
      //  y usando el ParseIntPipe
      
      const productos = [
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
   // Otros productos pueden añadirse aquí
 ];

 // Filtrar por marca y precio si están presentes
 const resultado = productos.filter(producto => {
   return (
     (!marca || producto.marca === marca) && 
     (!precio || producto.precio === precio)
   );
 });

 if (resultado.length === 0) {
   throw new NotFoundException('Producto no encontrado.');
 }

 return JSON.stringify(resultado);
}


  @ApiTags('Buscar Detalle de Producto')
  @ApiParam({ name: 'id', description: 'Id del Producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Obtener producto por Id' })
  @Get(':id')
  buscarDetalleProducto(@Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number): string { //DetalleProductoDto {
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
