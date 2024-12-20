import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';
import { Repository } from 'typeorm';
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
    try {
      // Validar si el IdComuna ya existe
      const idComunaExiste = await this.comunaRepository.findOne({
        where: { idComuna: createComunaDto.idComuna },
      });

      // Si el IdComuna ya existe, lanzar un error
      if (idComunaExiste) {
        throw new ConflictException(
          `El IdComuna ${createComunaDto.idComuna} ya está en uso`,
        );
      }

      // Validar si la comuna ya existe
      const comunaExistente = await this.comunaRepository.findOne({
        where: { nombreComuna: createComunaDto.nombreComuna },
      });

      // Si la comuna ya existe, lanzar un error
      if (comunaExistente) {
        throw new ConflictException(
          `La comuna ${createComunaDto.nombreComuna} ya existe`,
        );
      }
      // Mapear los datos del DTO a la entidad
      const comuna = comunaMapper.dtoCreateToComunaEntity(createComunaDto);
      // Guardar la entidad en la base de datos
      return await this.comunaRepository.save(comuna);
    } catch (error: any) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al intentar crear la dirección',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Listar todas las comunas
  async findAll(): Promise<Comuna[]> {
    try {
      return await this.comunaRepository.find({
        relations: ['region'],
      });
    } catch (error: any) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al intentar listar las comunas',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //#endregion

  //#region Buscar una comuna por ID
  async findOne(idComuna: number): Promise<Comuna> {
    try {
      // Buscar la comuna por ID
      const comunaEncontrada = await this.comunaRepository.findOne({
        where: { idComuna },
        relations: ['region'],
      });
      if (!comunaEncontrada) {
        throw new NotFoundException(
          `La comuna con ID ${idComuna} no fue encontrada`,
        );
      }
      return comunaEncontrada;
    } catch (error: any) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al intentar buscar la dirección',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#Region Buscar una comunas por region
  async findByRegion(idRegion: number): Promise<Comuna[]> {
    try {
      // Buscar las comunas por region
      const comunasEncontradas = await this.comunaRepository.find({
        where: { region: { idRegion } },
        order: { nombreComuna: 'ASC' },
      });
      if (!comunasEncontradas) {
        throw new NotFoundException(
          `La comuna con ID ${idRegion} no fue encontrada`,
        );
      }
      return comunasEncontradas;
    } catch (error: any) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al intentar buscar la dirección',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Actualizar una comuna
  async update(id: number, updateComunaDto: UpdateComunaDto) {
    try {
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
    } catch (error: any) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al intentar actualizar la dirección',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Eliminar una comuna
  async remove(id: number) {
    try {
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
    } catch (error: any) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al intentar eliminar la dirección',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion
}
