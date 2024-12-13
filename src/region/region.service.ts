import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionService {

  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  create(createRegionDto: CreateRegionDto) {
    return 'This action adds a new region';
  }

  //#region Listar todas las regiones
  async findAll(): Promise<Region[]> {
    return this.regionRepository.find();
  }
  //#endregion

  //#region Buscar una región por ID
  async findOne(idRegion: number): Promise<Region> {
    const regionEncontrada = await this.regionRepository.findOne({ where: { idRegion } });
    if (!regionEncontrada) {
      throw new NotFoundException(`La región con ID ${idRegion} no fue encontrada`);
    }
    return regionEncontrada
  }
  //#endregion

  //#region Actualizar una región
  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const regionEncontrada = await this.regionRepository.findOne({ where: { idRegion: id } });
    if (!regionEncontrada) {
      throw new NotFoundException(`La región con ID ${id} no fue encontrada`);
    }
    await this.regionRepository.update({ idRegion: id }, updateRegionDto);
    return this.regionRepository.findOne({ where: { idRegion: id } });
  }
  //#endregion

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
