import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  async create(createDireccionDto: CreateDireccionDto): Promise<ReadDireccionDto> {
    try {
      // Validar si alias ya existe
      const alias = createDireccionDto.alias;
      const direccionExistente = await this.direccionRepository.findOne({
        where: { alias },
        relations: ['comuna', 'comuna.region', 'usuario'],
      });
      if (direccionExistente) {
        throw new ConflictException(
          `Ya existe una dirección con el alias ${alias}`,
        );
      }
      // validar si la comuna existe
      const idComuna = createDireccionDto.idComuna;
      const comunaExistente = await this.direccionRepository.findOne({
        where: { comuna: { idComuna } },
        relations: ['comuna', 'comuna.region', 'usuario'],
      });
      if (!comunaExistente) {
        throw new NotFoundException(
          `La comuna con ID ${idComuna} no fue encontrada`,
        );
      }

      // Mapear los datos de la dirección
      const direccion =
        direccionMapper.dtoCreateDireccionToEntity(createDireccionDto);
      console.log(direccion);
      // Guardar la dirección en la base de datos
      const nuevaDireccion = await this.direccionRepository.save(direccion);

      // Buscar la dirección guardada
      const direccionGuardada = await this.direccionRepository.findOne({
        where: { idDireccion: nuevaDireccion.idDireccion },
        relations: ['comuna', 'comuna.region', 'usuario'],
      });

      // Mappear las direcciones
      const direccionCreada = direccionMapper.entityToReadDtoDireccion( direccionGuardada);

      return direccionCreada;
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

  //#region Listar todas las direcciones por usuario
  async findAllByUser(idUsuario: number): Promise<ReadDireccionDto[]> {
    try {
      // Buscar las direcciones del usuario
      const direccionesUsuario = await this.direccionRepository.find({
        where: { usuario: { idUsuario: idUsuario } },
        relations: ['comuna', 'comuna.region', 'usuario'],
      });

      // Mappear las direcciones
      const direccionesMapeadas =
        direccionMapper.entityListToDtoList(direccionesUsuario);

      return direccionesMapeadas;
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
          message:
            'Ha ocurrido un error al intentar buscar las direcciones del usuario',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Listar todas las direcciones activas por usuario
  async findAllActiveByUser(idUsuario: number): Promise<ReadDireccionDto[]> {
    try {
      // Buscar las direcciones activas del usuario
      const direccionesUsuario = await this.direccionRepository.find({
        where: { usuario: { idUsuario: idUsuario }, activo: true },
        relations: ['comuna', 'comuna.region', 'usuario'],
      });
      // Mappear las direcciones encontradas
      const direccionesMapeadas =
        direccionMapper.entityListToDtoList(direccionesUsuario);
      return direccionesMapeadas;
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
          message:
            'Ha ocurrido un error al intentar buscar las direcciones activas del usuario',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Buscar una dirección por ID
  async findOne(idDireccion: number): Promise<ReadDireccionDto> {
    try {
      // Obtener la dirección
      const direccion = await this.direccionRepository.findOne({
        where: { idDireccion: idDireccion },
        relations: ['comuna', 'comuna.region', 'usuario'],
      });
      // Validar si dirección existe
      if (!direccion) {
        throw new NotFoundException(
          `La dirección con ID ${idDireccion} no fue encontrada`,
        );
      }
      // Mappear las direcciones
      const direccionesMapeadas =
        direccionMapper.entityToReadDtoDireccion(direccion);
      return direccionesMapeadas;
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
          message: `Ha ocurrido un error al intentar buscar la dirección con ID ${idDireccion}`,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Actualizar una dirección
  async update(
    idDireccion: number,
    updateDireccionDto: UpdateDireccionDto,
  ): Promise<ReadDireccionDto> {
    try {
      const direccionActual = await this.direccionRepository.findOne({
        where: { idDireccion: idDireccion },
        relations: ['comuna', 'comuna.region', 'usuario'],
      });
      if (!direccionActual) {
        throw new NotFoundException(
          `La dirección con ID ${idDireccion} no fue encontrada`,
        );
      }
      // Mapear los datos actualizados
      const nuevaDireccion =
        direccionMapper.dtoUpdateDireccionToEntity(updateDireccionDto);
      // Actualizar la dirección
      await this.direccionRepository.update({ idDireccion }, nuevaDireccion);

      // Buscar la dirección actualizada
      const direccionGuardada = await this.direccionRepository.findOne({
        where: { idDireccion: idDireccion },
        relations: ['comuna', 'comuna.region', 'usuario'],
      });
      // Mappear las direcciones
      const direccionActualizada =
        direccionMapper.entityToReadDtoDireccion(direccionGuardada);
      // Devolver la dirección actualizada

      return direccionActualizada;
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

  //#region Eliminar una dirección
  async remove(idDireccion: number) {
    try {
      // Buscar la dirección
      const direccion = await this.direccionRepository.findOne({
        where: { idDireccion: idDireccion },
        relations: ['comuna', 'comuna.region'],
      });
      // Validar si dirección existe
      if (!direccion) {
        throw new NotFoundException(
          `La dirección con ID ${idDireccion} no fue encontrada`,
        );
      }

      // Eliminar la dirección
      await this.direccionRepository.delete({ idDireccion });
      const direccionExiste = await this.direccionRepository.findOne({
        where: { idDireccion: idDireccion },
      });
      if (direccionExiste) {
        throw new ConflictException(
          `La dirección con ID ${idDireccion} no pudo ser eliminada`,
        );
      }

      // Eliminar Dirección
      await this.direccionRepository.delete({ idDireccion });

      return {
        message: `La dirección con ID ${idDireccion} ha sido eliminada`,
      };
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
