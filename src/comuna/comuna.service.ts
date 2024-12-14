import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comuna } from './entities/comuna.entity';
import { comunaMapper } from './mapper/comuna.mapper';

@Injectable()
export class ComunaService {
  constructor(
    @InjectRepository(Comuna)
    private comunaRepository: Repository<Comuna>,
  ) {}

  //#region Crear una comuna
  async create(createComunaDto: CreateComunaDto): Promise<Comuna> {
    // Validar si el IdComuna ya existe
    const idComunaExiste = await this.comunaRepository.findOne({
      where: { idComuna: createComunaDto.idComuna },
    });

    // Si el IdComuna ya existe, lanzar un error
    if (idComunaExiste) {
      throw new ConflictException(`El IdComuna ${createComunaDto.idComuna} ya está en uso`);
    }

    // Validar si la comuna ya existe
    const comunaExistente = await this.comunaRepository.findOne({
      where: { nombreComuna: createComunaDto.nombreComuna },
    });

    // Si la comuna ya existe, lanzar un error
    if (comunaExistente) {
      throw new ConflictException(`La comuna ${createComunaDto.nombreComuna} ya existe`);
    }
    console.log('comunaExistente', comunaExistente);
    // Mapear los datos del DTO a la entidad
    const comuna = comunaMapper.dtoCreateToComunaEntity(createComunaDto);
    console.log('&&&&&&&&&&&& comuna', comuna);
    // Guardar la entidad en la base de datos
    return await this.comunaRepository.save(comuna);
  }
  //#endregion

  //#region Listar todas las comunas
  async findAll(): Promise<Comuna[]> {
    return await this.comunaRepository.find();
  }
  //#endregion

  //#region Buscar una comuna por ID
  async findOne(idComuna: number): Promise<Comuna> {
    const comunaEncontrada = await this.comunaRepository.findOne({
      where: { idComuna },
    });
    if (!comunaEncontrada) {
      throw new NotFoundException(
        `La comuna con ID ${idComuna} no fue encontrada`,
      );
    }
    return comunaEncontrada;
  }
  //#endregion

  //#region Actualizar una comuna
  async update(id: number, updateComunaDto: UpdateComunaDto) {
    // Buscar la comuna existente
    const comunaEncontrada = await this.comunaRepository.findOne({
      where: { idComuna: id },
    });
  
    // Lanzar excepción si no se encuentra
    if (!comunaEncontrada) {
      throw new NotFoundException(`La comuna con ID ${id} no fue encontrada`);
    }
  
    // Actualizar la entidad usando el mapper
    const comunaActualizada = this.comunaRepository.merge(
      comunaEncontrada,
      comunaMapper.dtoUpdateToComunaEntity(updateComunaDto),
    );
  
    // Guardar los cambios
    await this.comunaRepository.save(comunaActualizada);
  
    // Retornar la entidad actualizada
    return comunaActualizada;
  }
  //#endregion

  //#region Eliminar una comuna
  async remove(id: number) {
    // Buscar la comuna existente
    const comunaEncontrada = await this.comunaRepository.findOne({
      where: { idComuna: id },
    });

    // Lanzar excepción si no se encuentra
    if (!comunaEncontrada) {
      throw new NotFoundException(`La comuna con ID ${id} no fue encontrada`);
    }

    // Eliminar la entidad
    await this.comunaRepository.remove(comunaEncontrada);

    return `Comuna con ID ${id} ha sido eliminada satisfactoriamente`;
  }
  //#endregion
}
