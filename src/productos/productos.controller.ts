import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ActualizarProductoDto } from './dto/update-producto.dto';
import { ProductoService } from './productos.service';
import { GetProductoDto } from './dto/read-producto.dto';


@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // Endpoint para obtener todos los productos
  @ApiTags('Obtener Catálogo de Productos')
  @ApiOperation({ summary: 'Obtener el catalogo de los productos',
    description: 'HU 4.1 - Mostrar Listado de productos (C: Como "Pet lover" (usuario) quiero ver las opciones de productos en un listado amplio y variado con paginación, para identificar rápidamente los diferentes productos del catálogo '})
  @ApiResponse({ status: 200, description: 'Obtiene todos los productos.' })
  @ApiResponse({ status: 404, description: 'No se encontraron productos.' })
  @Get()
  findAll(){
    return this.productoService.catalogoProductos();
  }

  @ApiTags('Obtener Detalle de Producto')
  @ApiOperation({ summary: 'Obtener producto por Id',description:'HU 4.2 - Información detallada de productos: Como "Pet lover" (usuario), quiero ver información detallada sobre los productos, incluyendo opiniones, para tomar decisiones informadas sobre mis compras.' })
  @ApiParam({ name: 'id', description: 'Id del Producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @Get(':id')
  findProductId(@Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number) { //GetProductoDto {
    return this.productoService.DetalleProducto(id);
}

  @ApiTags('Obtener Catálogo de Productos Paginado')
  @ApiOperation({ summary: 'Obtener el catalogo de los productos paginado'})
  @ApiParam({ name: 'pagina', description: 'Número de la pagina' })
  @ApiParam({ name: 'cantidadPorPagina', description: 'Cantidad de productos por pagina' })
  @ApiResponse({ status: 200, description: 'Obtiene todos los productos por pagina.' })
  @ApiResponse({ status: 404, description: 'No se encontraron productos.' })
  @Get(":pagina/:cantidadPorPagina")
  async findAllPag(
      @Param("pagina") pagina: number,
      @Param("cantidadPorPagina") cantidadPorPagina: number 
     ): Promise<GetProductoDto[]>{
        const resultado : GetProductoDto[] = await this.productoService.catalogoProductosPag(pagina, cantidadPorPagina);
    return resultado;
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



