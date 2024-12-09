import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { MarcaProductoService } from './marca-producto.service';
import { CreateMarcaProductoDto } from './dto/create-marca-producto.dto';
import { UpdateMarcaProductoDto } from './dto/update-marca-producto.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Marca Productos')
@Controller('marca-producto')
export class MarcaProductoController {
  constructor(private readonly marcaProductoService: MarcaProductoService) {}

  //#region Crear Marca Producto
  @ApiOperation({
    summary: 'Crear Marca Producto',
    description: 'Crea una nueva marca de producto',
  })
  @ApiResponse({
    status: 201,
    description: 'Marca de producto creada exitosamente.',
  })
  @ApiResponse({
    status: 409,
    description: 'La marca que está intentando crear ya existe.',
  })
  @Post()
  create(
    @Body(new ValidationPipe()) createMarcaProductoDto: CreateMarcaProductoDto,
  ) {
    return this.marcaProductoService.create(createMarcaProductoDto);
  }
  //#endregion

  //#region Listar todas las Marcas de Productos
  @ApiOperation({
    summary: 'Listar todas las Marcas de Productos',
    description: 'Obtiene una lista de todas las marcas de productos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de marcas de productos.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron marcas de productos.',
  })
  @Get()
  findAll() {
    return this.marcaProductoService.findAll();
  }
  //#endregion

  //#region Obtener Marca Producto por Id
  @ApiOperation({
    summary: 'Obtener Marca Producto por Id',
    description: 'Obtiene una marca de producto por su id',
  })
  @ApiResponse({
    status: 200,
    description: 'Marca de producto encontrada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Marca de producto no encontrada.',
  })
  @ApiParam({
    name: 'idMarcaProducto',
    description: 'Id de la marca de producto',
    example: 1,
  })
  @Get(':idMarcaProducto')
  findOne(
    @Param(
      'idMarcaProducto',
      new ParseIntPipe({
        exceptionFactory: (error) =>
          new BadRequestException(
            'El Id de Marca Producto debe ser un número entero válido.',
          ),
      }),
    )
    idMarcaProducto: number,
  ) {
    return this.marcaProductoService.findOne(+idMarcaProducto);
  }
  //#endregion

  //#region Actualizar Marca Producto por Id
  @ApiOperation({
    summary: 'Actualizar Marca Producto por Id',
    description: 'Actualiza una marca de producto por su id',
  })
  @ApiResponse({
    status: 200,
    description: 'Marca de producto actualizada',
  })
  @ApiResponse({
    status: 404,
    description: 'Marca de producto no encontrada',
  })
  @ApiParam({
    name: 'idMarcaProducto',
    description: 'Id de la marca de producto',
    example: 1,
  })
  @Patch(':idMarcaProducto')
  update(
    @Param(
      'idMarcaProducto',
      new ParseIntPipe({
        exceptionFactory: (error) =>
          new BadRequestException(
            'El Id de Marca Producto debe ser un número entero válido.',
          ),
      }),
    ) idMarcaProducto: string,
    @Body(new ValidationPipe()) updateMarcaProductoDto: UpdateMarcaProductoDto,
  ) {
    return this.marcaProductoService.update(+idMarcaProducto, updateMarcaProductoDto);
  }
  //#endregion

  //#region Eliminar Marca Producto por Id
  @ApiOperation({
    summary: 'Eliminar Marca Producto por Id',
    description: 'Elimina una marca de producto por su id',
  })
  @ApiResponse({
    status: 200,
    description: 'Marca de producto eliminada satisfactoriamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Marca de producto no encontrada',
  })
  @ApiParam({
    name: 'idMarcaProducto',
    description: 'Id de la marca de producto',
    example: 1,
  })
  @Delete(':idMarcaProducto')
  remove(@Param(
    'idMarcaProducto',
    new ParseIntPipe({
      exceptionFactory: (error) =>
        new BadRequestException(
          'El Id de Marca Producto debe ser un número entero válido.',
        ),
    }),
  ) idMarcaProducto: number) {
    return this.marcaProductoService.remove(+idMarcaProducto);
  }
  //#endregion
}
