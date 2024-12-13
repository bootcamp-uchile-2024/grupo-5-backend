import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comuna } from './entities/comuna.entity';

@Injectable()
export class ComunaService {
  constructor(
    @InjectRepository(Comuna)
    private comunaRepository: Repository<Comuna>,
  ) {}

  create(createComunaDto: CreateComunaDto) {
    return 'This action adds a new comuna';
  }

  //#region Listar todas las comunas
  async findAll(): Promise<Comuna[]> {
    return await this.comunaRepository.find();
  }
  //#endregion

  //#region Buscar una comuna por ID
  async findOne(idComuna: number): Promise<Comuna> {
    const comunaEncontrada = await this.comunaRepository.findOne({ where: { idComuna } });
    if (!comunaEncontrada) {
      throw new NotFoundException(`La comuna con ID ${idComuna} no fue encontrada`);
    }
    return comunaEncontrada;
  }
  //#endregion

  //#region Actualizar una comuna
  async update(id: number, updateComunaDto: UpdateComunaDto) {
    const comunaEncontrada = await this.comunaRepository.findOne({ where: { idComuna: id } });
    if (!comunaEncontrada) {
      throw new NotFoundException(`La comuna con ID ${id} no fue encontrada`);
    }
   await this.comunaRepository.update({ idComuna: id }, updateComunaDto);
    
    return this.comunaRepository.findOne({ where: { idComuna: id } });
  }
  //#endregion

  remove(id: number) {
    return `This action removes a #${id} comuna`;
  }
}
