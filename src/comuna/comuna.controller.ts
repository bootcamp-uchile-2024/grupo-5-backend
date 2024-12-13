import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComunaService } from './comuna.service';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Gestión de Regiones')
@Controller('comuna')
export class ComunaController {
  constructor(private readonly comunaService: ComunaService) {}

  @Post()
  create(@Body() createComunaDto: CreateComunaDto) {
    return this.comunaService.create(createComunaDto);
  }

  //#region Listar todas las comunas
  @ApiOperation({
    summary: 'Comunas - Listar Comunas',
    description:'Listar todas las comununas',
  })
  @ApiResponse({
    status: 200,
    description: 'Comunas encontradas.',
  })
  @ApiResponse({
    status: 404,
    description: 'Comunas no encontradas.',
  })
  @Get()
  findAll() {
    return this.comunaService.findAll();
  }
  //#endregion

  //#region Buscar una comuna por ID
  @ApiOperation({
    summary: 'Comunas - Buscar Comuna por ID',
    description:'Buscar una comuna por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Comuna encontrada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Comuna no encontrada.',
  })
  @UsePipes(new ValidationPipe())
  @ApiParam({
    name: 'idComuna',
    description: 'ID de la comuna',
    type: 'number',
    required: true,
    example: 13101,
  })
  @Get(':idComuna')
  findOne(@Param('idComuna') idComuna: number) {
    return this.comunaService.findOne(+idComuna);
  }
  //#endregion

  //#region Actualizar una comuna
  @ApiOperation({
    summary: 'Comunas - Actualizar Comuna',
    description:'Actualizar una comuna',
  })
  @ApiResponse({
    status: 200,
    description: 'Comuna actualizada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Comuna no encontrada.',
  })
  // @UsePipes(new ValidationPipe())
  @ApiParam({
    name: 'idComuna',
    description: 'ID de la comuna',
    type: 'number',
    required: true,
    example: 13101,
  })
  @ApiBody({
    type: UpdateComunaDto,
  })
  @Patch(':idComuna')
  update(@Param('idComuna') idComuna: number, @Body() updateComunaDto: UpdateComunaDto) {
    return this.comunaService.update(+idComuna, updateComunaDto);
  }
  //#endregion

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunaService.remove(+id);
  }
}
