import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Gestión de Regiones')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  // @Post()
  // create(@Body() createRegionDto: CreateRegionDto) {
  //   return this.regionService.create(createRegionDto);
  // }

  //#region Listar todas las regiones
  @ApiOperation({
    summary: 'Regiones - Listar Regiones',
    description: 'Listar todas las regiones',
  })
  @ApiResponse({
    status: 200,
    description: 'Regiones encontradas.',
  })
  @ApiResponse({
    status: 404,
    description: 'Regiones no encontradas.',
  })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }
  //#endregion

  //#region Buscar una región por ID
  @ApiOperation({
    summary: 'Regiones - Buscar Región por ID',
    description: 'Buscar una región por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Región encontrada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Región no encontrada.',
  })
  @ApiParam({
    name: 'idRegion',
    description: 'ID de la región',
    type: 'number',
    required: true,
    example: 13,
  })
  @Get('region/:idRegion')
  findOne(@Param('idRegion', new ValidationPipe()) idRegion: number) {
    return null; // this.regionService.findOne(+idRegion);
  }
  //#endregion

  //#region Actualizar una región
  @ApiOperation({
    summary: 'Regiones - Actualizar Región',
    description: 'Actualizar una región',
  })
  @ApiResponse({
    status: 200,
    description: 'Región actualizada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Región no encontrada.',
  })
  @ApiParam({
    name: 'idRegion',
    description: 'ID de la región',
    type: 'number',
    required: true,
    example: 5,
  })
  @ApiBody({ type: UpdateRegionDto })
  @Patch(':idRegion')
  update(
    @Param('idRegion', new ValidationPipe()) idRegion: string,
    @Body(new ValidationPipe()) updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionService.update(+idRegion, updateRegionDto);
  }
  //#endregion

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.regionService.remove(+id);
  // }
}
