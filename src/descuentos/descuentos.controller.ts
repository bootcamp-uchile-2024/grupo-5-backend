import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { DescuentosService } from './descuentos.service';
import { CreateDescuentoDto } from './dto/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/update-descuento.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Gestión de Descuentos')
@Controller('descuentos')
export class DescuentosController {
  constructor(private readonly descuentosService: DescuentosService) {}

  //#region Crear Descuento
  @ApiOperation({
    summary: 'Crear Descuento',
    description: 'Crea un nuevo descuento',
  })
  @ApiResponse({
    status: 201,
    description: 'Descuento creado exitosamente.',
  })
  @ApiResponse({
    status: 409,
    description: 'El descuento que está intentando crear ya existe.',
  })
  @Post()
  create(@Body(new ValidationPipe()) createDescuentoDto: CreateDescuentoDto) {
    return this.descuentosService.create(createDescuentoDto);
  }
  //#endregion

  //#region Listar Descuentos
  @ApiOperation({
    summary: 'Listar Descuentos',
    description: 'Obtiene una lista de todos los descuentos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de descuentos.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron descuentos.',
  })
  @Get()
  findAll() {
    return this.descuentosService.findAll();
  }
  //#endregion

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.descuentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDescuentoDto: UpdateDescuentoDto) {
    return this.descuentosService.update(+id, updateDescuentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.descuentosService.remove(+id);
  }
}
