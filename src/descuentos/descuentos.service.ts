import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDescuentoDto } from './dto/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/update-descuento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Descuento } from './entities/descuento.entity';
import { Repository } from 'typeorm';
import { DescuentoMapper } from './mapper/descuento.mapper';

@Injectable()
export class DescuentosService {
  constructor(
    @InjectRepository(Descuento)
    private DescuentoRepository: Repository<Descuento>,

  ) {}

  async create(createDescuentoDto: CreateDescuentoDto): Promise<Descuento> {
    // Validar si el descuento ya existe
    console.log('>>>>>>>>>>>>> #CcreateDescuentoDto: ', createDescuentoDto);
    const descuentoExiste = await this.DescuentoRepository.findOne({
      where: { nombreDescuento: createDescuentoDto.nombreDescuento },
    });
    
    console.log('>>>>>>>>>>>>> #DescuentoExiste: ', descuentoExiste);
    if (descuentoExiste) {
      throw new HttpException(
        { message: 'El descuento ya existe.', error: 'Conflict' },
        HttpStatus.CONFLICT,
      );

    }
    // Mapear el DTO a una entidad de tipo Descuento
    const  descuento =  DescuentoMapper.dtoCreateDescuentoToEntity(createDescuentoDto);
    console.log('>>>>>>>>>>>>> #Descuento: ', descuento);
    // Guardar la entidad en la base de datos
    return await this.DescuentoRepository.save(descuento);
  }

  async findAll(): Promise<Descuento[]> {
    return await this.DescuentoRepository.find(); 
  }

  findOne(id: number) {
    return `This action returns a #${id} descuento`;
  }

  update(id: number, updateDescuentoDto: UpdateDescuentoDto) {
    return `This action updates a #${id} descuento`;
  }

  remove(id: number) {
    return `This action removes a #${id} descuento`;
  }
}
