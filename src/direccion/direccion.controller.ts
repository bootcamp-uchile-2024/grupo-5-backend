import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Gestión de Direcciones')
@Controller('direccion')
export class DireccionController {
  constructor(private readonly direccionService: DireccionService) {}

  //#region Crear una dirección
  @ApiOperation({
    summary: 'Direcciones - Crear Dirección',
    description: 'Crea una nueva dirección para el usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Dirección creada exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear la dirección.',
  })
  @ApiBody({
    type: CreateDireccionDto,
    description: 'Ingrese los datos de la dirección',
  })
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createDireccionDto: CreateDireccionDto) {
    return this.direccionService.create(createDireccionDto);
  }
  //#endregion

  //#region Listar todas las direcciones
  @ApiOperation({
    summary: 'Direcciones - Listar todas las Direcciones del Usuario',
    description: 'Listar todas las direcciones del usuario incluyendo las inactivas',
  })
  @ApiResponse({
    status: 200,
    description: 'Direcciones encontradas.',
  })
  @ApiResponse({
    status: 404,
    description: 'Direcciones no encontradas.',
  })
  @ApiParam({
    name: 'idUsuario',
    description: 'ID del Usuario',
    type: 'number',
    required: true,
    example: 1,
  })
  @Get('direcciones/:idUsuario')
  findAllByUser(@Param('idUsuario') idUsuario: number) {
    return this.direccionService.findAllByUser(+idUsuario);
  }
  //#endregion

  //#region Listar todas las direcciones activas por usuario
  @ApiOperation({
    summary: 'Direcciones - Listar Direcciones Activas del Usuario',
    description: 'Listar solo las direcciones activas del usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Direcciones encontradas.',
  })
  @ApiResponse({
    status: 404,
    description: 'Direcciones no encontradas.',
  })
  @ApiParam({
    name: 'idUsuario',
    description: 'ID del Usuario',
    type: 'number',
    required: true,
    example: 1,
  })
  @Get('activas/:idUsuario')
  findAllActiveByUser(@Param('idUsuario') idUsuario: number) {
    return this.direccionService.findAllActiveByUser(+idUsuario);
  }
  //#endregion

  //#region Buscar una dirección por ID
  @ApiOperation({
    summary: 'Direcciones - Buscar Dirección por ID',
    description: 'Buscar una dirección por su Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Dirección encontrada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Dirección no encontrada.',
  })
  @ApiParam({
    name: 'idDireccion',
    description: 'ID de la dirección',
    type: 'number',
    required: true,
    example: 1,
  })
  @UsePipes(new ValidationPipe())
  @Get(':idDireccion')
  findOne(@Param('idDireccion') idDireccion: string) {
    return this.direccionService.findOne(+idDireccion);
  }
  //#endregion

  //#region Actualizar una dirección por ID
  @ApiOperation({
    summary: 'Direcciones - Actualizar Dirección',
    description: 'Actualizar una dirección por por su Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Dirección actualizada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Dirección no encontrada.',
  })
  @ApiParam({
    name: 'idDireccion',
    description: 'ID de la dirección',
    type: 'number',
    required: true,
    example: 1,
  })
  @ApiBody({
    type: UpdateDireccionDto,
    description: 'Ingrese los datos de la dirección',
  })
  @UsePipes(new ValidationPipe())
  @Patch(':idDireccion')
  update(
    @Param('idDireccion') idDireccion: number,
    @Body() updateDireccionDto: UpdateDireccionDto,
  ) {
    return this.direccionService.update(+idDireccion, updateDireccionDto);
  }
  //#endregion

  //#region Eliminar una dirección por su ID
  @ApiOperation({
    summary: 'Direcciones - Eliminar Dirección',
    description: 'Eliminar una dirección por su Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Dirección eliminada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Dirección no encontrada.',
  })
  @ApiParam({
    name: 'idDireccion',
    description: 'ID de la dirección',
    type: 'number',
    required: true,
    example: 1,
  })
  @UsePipes(new ValidationPipe())
  @Delete(':idDireccion')
  remove(@Param('idDireccion') idDireccion: number) {
    return this.direccionService.remove(+idDireccion);
  }
  //#endregion
}
