import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrocomprasService } from './carrocompras.service';
import { CreateCarrocompraDto } from './dto/create-carrocompra.dto';
import { UpdateCarrocompraDto } from './dto/update-carrocompra.dto';

@Controller('carrocompras')
export class CarrocomprasController {
  constructor(private readonly carrocomprasService: CarrocomprasService) {}

  @Post()
  create(@Body() createCarrocompraDto: CreateCarrocompraDto) {
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrocomprasService.remove(+id);
  }
}
