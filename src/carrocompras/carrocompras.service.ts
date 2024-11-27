import { Injectable } from '@nestjs/common';
import { UpdateCarrocompraDto } from './dto/update-carroCmpra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarroCompras } from './entities/carroCompra.entity';
import { Repository } from 'typeorm';
import { CreateCarroCompraDto } from './dto/create-carroCompra.dto';


@Injectable()
export class CarrocomprasService {

  constructor(
    @InjectRepository(CarroCompras)
    private carroComprasRepository: Repository<CarroCompras>,
  ) {}

  async create(createCarrocompraDto: CreateCarroCompraDto) : Promise<CarroCompras> {
    const carroCompra = new CarroCompras();
    carroCompra.idUsuario = createCarrocompraDto.idUsuario;
    carroCompra.fechaCreacion = createCarrocompraDto.fechaCreacion;
    carroCompra.precioTotal = createCarrocompraDto.precioTotal;
    carroCompra.detallesCarro = createCarrocompraDto.detallesCarro;
     return await this.carroComprasRepository.save(carroCompra);
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
