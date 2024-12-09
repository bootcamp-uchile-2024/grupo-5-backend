import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriaProductoService } from './categoria-producto.service';
import { CreateCategoriaProductoDto } from './dto/create-categoria-producto.dto';
import { UpdateCategoriaProductoDto } from './dto/update-categoria-producto.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categoría Productos')
@Controller('categoria-producto')
export class CategoriaProductoController {
  constructor(
    private readonly categoriaProductoService: CategoriaProductoService,
  ) {}

  //#region Crear Categoría de Producto
  @ApiOperation({
    summary: 'Crear Categoría de Producto',
    description: 'Crea una nueva categoría de producto en la base de datos',
  })
  @ApiResponse({
    status: 201,
    description: 'Categoría de producto creada exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Error en los datos ingresados' })
  @Post()
  create(@Body(new ValidationPipe()) createCategoriaProductoDto: CreateCategoriaProductoDto) {
    return this.categoriaProductoService.create(createCategoriaProductoDto);
  }
  //#endregion

  //#region Listar Categoría de Productos
  @ApiOperation({
    summary: 'Listar todas las Categoría de Productos',
    description: 'Obtiene una lista de todas las categorías de productos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías de productos.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron categorías de productos.',
  })
  @Get()
  findAll() {
    return this.categoriaProductoService.findAll();
  }
  //#endregion

  //#region Obtener Categoría de Producto por Id
  @ApiOperation({
    summary: 'Obtener Categoría Producto por Id',
    description: 'Obtiene una categoria de producto por su id',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría de producto encontrada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría de producto no encontrada.',
  })
  @ApiParam({
    name: 'idCategoriaProducto',
    description: 'Id de la categoria de producto',
    example: 1,
  })
  @Get(':idCategoriaProducto')
  findOne(@Param('idCategoriaProducto') idCategoriaProducto: string) {
    return this.categoriaProductoService.findOne(+idCategoriaProducto);
  }
  //#endregion

  //#region Actualizar Categoría de Producto por Id
  @ApiOperation({
    summary: 'Actualizar Categoría Producto por Id',
    description: 'Actualiza una categoría de producto por su id',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría de producto actualizada exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría de producto no encontrada.',
  })
  @ApiParam({
    name: 'idCategoriaProducto',
    description: 'Id de la categoría de producto',
    example: 1,
  })
  @Patch(':idCategoriaProducto')
  update(
    @Param('idCategoriaProducto') idCategoriaProducto: string,
    @Body() updateCategoriaProductoDto: UpdateCategoriaProductoDto,
  ) {
    return this.categoriaProductoService.update(
      +idCategoriaProducto,
      updateCategoriaProductoDto,
    );
  }
  //#endregion

  //#region Eliminar Categoría de Producto por Id
  @ApiOperation({
    summary: 'Eliminar Categoría Producto por Id',
    description: 'Elimina una categoría de producto por su id',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría de producto eliminada exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría de producto no encontrada.',
  })
  @ApiParam({
    name: 'idCategoriaProducto',
    description: 'Id de la categoría de producto',
    example: 1,
  })
  @Delete(':idCategoriaProducto')
  remove(@Param('idCategoriaProducto') idCategoriaProducto: string) {
    return this.categoriaProductoService.remove(+idCategoriaProducto);
  }
  //#endregion
}
