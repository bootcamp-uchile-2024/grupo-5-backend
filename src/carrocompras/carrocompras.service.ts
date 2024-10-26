import { Injectable } from '@nestjs/common';
import { CreateCarrocompraDto } from './dto/create-carrocompra.dto';
import { UpdateCarrocompraDto } from './dto/update-carrocompra.dto';

@Injectable()
export class CarrocomprasService {
  create(createCarrocompraDto: CreateCarrocompraDto) {
    return 'This action adds a new carrocompra';
  }

  findAll() {
    return `This action returns all carrocompras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carrocompra`;
  }

  update(id: number, updateCarrocompraDto: UpdateCarrocompraDto) {
    return `This action updates a #${id} carrocompra`;
  }

  remove(id: number) {
    return `This action removes a #${id} carrocompra`;
  }
}
