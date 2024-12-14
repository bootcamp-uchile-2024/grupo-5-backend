import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { ReadDireccionDto } from './dto/read-direccion.dto';
import { direccionMapper } from './mapper/direccion.mapper';

@Injectable()
export class DireccionService {
  constructor(
    @InjectRepository(Direccion)
    private direccionRepository: Repository<Direccion>,
  ) {}

  //#region Crear una dirección
  async create(createDireccionDto: CreateDireccionDto): Promise<Direccion> {
    // Validar si alias ya existe
    const alias = createDireccionDto.alias;
    const direccionExistente = await this.direccionRepository.findOne({
      where: { alias },
    });
    if (direccionExistente) {
      throw new ConflictException(
        `Ya existe una dirección con el alias ${alias}`
      );
    }
    
    // Mapear los datos de la dirección
    const direccion = direccionMapper.dtoCreateDireccionToEntity(
      createDireccionDto,
    );
    console.log(direccion);
    // Guardar la dirección en la base de datos
    const direccionGuardada = await this.direccionRepository.save(direccion);

    return direccionGuardada;
  }
  //#endregion

  //#region Listar todas las direcciones por usuario
  async findAllByUser(idUsuario: number): Promise<Direccion[]> {
    const direccionesUsuario = await this.direccionRepository.find({
      where: { usuario: { idUsuario: idUsuario } },
      relations: ['comuna'],
    });
    return direccionesUsuario;
  }
  //#endregion

  //#region Listar todas las direcciones activas por usuario
  async findAllActiveByUser(idUsuario: number): Promise<Direccion[]> {
    const direccionesUsuario = await this.direccionRepository.find({
      where: { usuario: { idUsuario: idUsuario }, activo: true },
      relations: ['comuna'],
    });

    return direccionesUsuario;
  }
  //#endregion

  //#region Buscar una dirección por ID
  async findOne(idDireccion: number): Promise<Direccion> {
    const direccion = await this.direccionRepository.findOne({
      where: { idDireccion: idDireccion },
      relations: ['comuna'],
    });
    if (!direccion) {
      throw new NotFoundException(
        `La dirección con ID ${idDireccion} no fue encontrada`,
      );
    }
    return direccion;
  }
  //#endregion

  //#region Actualizar una dirección
  async update(
    idDireccion: number,
    updateDireccionDto: UpdateDireccionDto,
  ): Promise<Direccion> {
    const direccion = await this.direccionRepository.findOne({
      where: { idDireccion: idDireccion },
    });
    if (!direccion) {
      throw new NotFoundException(
        `La dirección con ID ${idDireccion} no fue encontrada`,
      );
    }
    // Mapear los datos actualizados
    const direccionMapeada =
      direccionMapper.dtoUpdateDireccionToEntity(updateDireccionDto);

    // Actualizar la dirección
    await this.direccionRepository.update(
      { idDireccion },
      direccionMapeada,
    );

    // Buscar la dirección actualizada
    const direccionActualizada = await this.direccionRepository.findOne({
      where: { idDireccion: idDireccion },
      relations: ['comuna'],
    });

    // Devolver la dirección actualizada
    
    return direccionActualizada;
  }
  //#endregion

  //#region Eliminar una dirección
  async remove(idDireccion: number) {
    const direccion = await this.direccionRepository.findOne({
      where: { idDireccion: idDireccion },
    });

    if (!direccion) {
      throw new NotFoundException(
        `La dirección con ID ${idDireccion} no fue encontrada`,
      );
    }

    // Eliminar la dirección
    await this.direccionRepository.delete({ idDireccion });
    //Validar si dirección existe
    const direccionExiste = await this.direccionRepository.findOne({
      where: { idDireccion: idDireccion },
    });
    if (direccionExiste) {
      throw new ConflictException(
        `La dirección con ID ${idDireccion} no pudo ser eliminada`
      );
    }

    // Eliminar Dirección
    await this.direccionRepository.delete({ idDireccion });

    return { message: `La dirección con ID ${idDireccion} ha sido eliminada`};
  }
  //#endregion
}
