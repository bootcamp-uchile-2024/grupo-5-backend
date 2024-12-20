import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ActualizarProductoDto } from './dto/update-producto.dto';
import { ProductoService } from './productos.service';
import { GetProductoDto } from './dto/read-producto.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  //#region Crear Producto
  @ApiTags('Productos')
  @ApiOperation({ summary: 'Crear nuevo producto' })
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({ status: 200, description: 'Producto creado con éxito.' })
  @ApiResponse({ status: 409, description: 'Producto ya existe.' })
  @UsePipes(new ValidationPipe())
  // @UseInterceptors(FilesInterceptor('listaArchivos'))
  @Post()
  async createProduct(
    @Body() createProductoDto: CreateProductoDto
  ) {
    return await this.productoService.createProducto(createProductoDto);
  }
  //#endregion

  //#region Obtener Producto por Id
  @ApiTags('Productos')
  @ApiOperation({
    summary: 'HU 4.2: Obtener producto por Id',
    description:
      '<strong>HU 4.2 - Información detallada de productos:</strong> Como "Pet lover" (usuario), quiero ver información detallada sobre los productos, incluyendo opiniones, para tomar decisiones informadas sobre mis compras.',
  })
  @ApiParam({ name: 'id', description: 'Id del Producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @Get(':id')
  async findProductId(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number,
  ): Promise<GetProductoDto[]> {
    return await this.productoService.DetalleProducto(id);
  }
  //#endregion

  //#region Actualizar Producto
  @ApiTags('Productos')
  @ApiBody({ type: ActualizarProductoDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Actualizar producto por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id del producto' })
  @UsePipes(new ValidationPipe())
  @Put(':id/actualizar')
  async update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number,
    @Body() actualizarProductoDto: ActualizarProductoDto,
  ): Promise<string> {
    await this.productoService.actualizarProducto(id, actualizarProductoDto);
    return `El producto ${id} fue actualizado con éxito.`;
  }
  //#endregion

  //#region Habilitar Producto
  @ApiTags('Productos')
  @ApiResponse({ status: 200, description: 'Producto habilitado con éxito.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Habilitar producto por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id del producto.' })
  @Put(':id/alta')
  async activate(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number,
  ): Promise<string> {
    await this.productoService.activate(id);
    return `El producto ${id} habilitado con éxito.`;
  }
  //#endregion

  //#region Baja de un Producto
  @ApiTags('Productos')
  @ApiResponse({
    status: 200,
    description: 'Producto fue dado de baja con éxito.',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiOperation({ summary: 'Baja de un producto por Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id del producto.' })
  @UsePipes(new ValidationPipe())
  @Put(':id/baja')
  async remove(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number,
  ): Promise<string> {
    await this.productoService.remove(id);
    return `El producto ${id} fue dado de baja con éxito.`;
  }
  //#endregion

  //#region Obtener Catálogo de Productos
  @ApiTags('Catálogo de Productos')
  @ApiOperation({
    summary: 'HU 4.1: Obtener el Catálogo de los Productos',
    description:
      '<strong>HU 4.1 - Mostrar Listado de Productos: </strong>Como "Pet lover" (usuario) quiero ver las opciones de productos en un listado amplio y variado con paginación, para identificar rápidamente los diferentes productos del catálogo.',
  })
  @ApiResponse({ status: 200, description: 'Obtiene todos los productos.' })
  @ApiResponse({ status: 404, description: 'No se encontraron productos.' })
  @Get()
  async findAll() {
    return await this.productoService.catalogoProductos();
  }
  //#endregion

  //#region Obtener Catálogo de Productos Paginado
  @ApiTags('Catálogo de Productos')
  @ApiOperation({
    summary: 'HU 4.1: Obtener el Ctálogo de los Productos Paginado',
    description:
      '<strong>HU 4.1 - Mostrar Listado de Productos: </strong>Como "Pet lover" (usuario) quiero ver las opciones de productos en un listado amplio y variado con paginación, para identificar rápidamente los diferentes productos del catálogo.',
  })
  @ApiParam({ name: 'pagina', description: 'Número de la página' })
  @ApiParam({
    name: 'cantidadPorPagina',
    description: 'Cantidad de productos por página',
  })
  @ApiResponse({
    status: 200,
    description: 'Obtiene todos los productos por página.',
  })
  @ApiResponse({ status: 404, description: 'No se encontraron productos.' })
  @Get(':pagina/:cantidadPorPagina')
  async findAllPag(
    @Param('pagina') pagina: number,
    @Param('cantidadPorPagina') cantidadPorPagina: number,
  ): Promise<GetProductoDto[]> {
    const resultado: GetProductoDto[] =
      await this.productoService.catalogoProductosPag(
        pagina,
        cantidadPorPagina,
      );
    return resultado;
  }
  //#endregion
}
