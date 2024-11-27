import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrocomprasService } from './carrocompras.service';
import { UpdateCarrocompraDto } from './dto/update-carroCmpra.dto';

import { ApiTags } from '@nestjs/swagger';
import { CreateCarroCompraDto } from './dto/create-carroCompra.dto';

@ApiTags('Carro de Compras')
@Controller('carrocompras')
export class CarrocomprasController {
  constructor(private readonly carrocomprasService: CarrocomprasService) {}

  @Post()
  create(@Body() createCarrocompraDto: CreateCarroCompraDto) {
    return this.carrocomprasService.create(createCarrocompraDto);
  }

  @Get()
  findAll() {
    return this.carrocomprasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrocomprasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarrocompraDto: UpdateCarrocompraDto) {
    return this.carrocomprasService.update(+id, updateCarrocompraDto);
  }

  //EL GENERAR EL PEDIDO LLAMA A ESTE SERVICO DONDE LIMPIA EL CARRO
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrocomprasService.remove(+id);
  }
}
