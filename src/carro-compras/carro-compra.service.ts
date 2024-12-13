import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCarrocompraDto } from './dto/update-carro-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarroCompraDto } from './dto/create-carro-compra.dto';
import { carroCompraMapper } from './mapper/carro-compra.mapper';
import { CarroCompra } from './entities/carro-compra.entity';
import { UsuarioService } from 'src/usuarios/usuarios.service';

@Injectable()
export class CarroCompraService {
  constructor(
    @InjectRepository(CarroCompra)
    private CarroCompraRepository: Repository<CarroCompra>,
    private readonly usuarioService: UsuarioService,
  ) {}

  //#region Crear Carro de Compras
  async create(
    id_usuario: number,
    carroCompra: CreateCarroCompraDto,
  ): Promise<CarroCompra> {
    const usuarioExiste = await this.usuarioService.findUsuarioById(id_usuario);
    if (!usuarioExiste) {
      throw new HttpException(
        {
          message: 'Usuario no encontrado',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const getCarroCompraByIdUsuario =
      await this.getCarroCompraByIdUsuario(id_usuario);

    if (!getCarroCompraByIdUsuario) {
      const nuevoCarroCompra =
        carroCompraMapper.dtoToCarroCompraEntity(carroCompra);
      nuevoCarroCompra.idUsuario = id_usuario;
      const carroCreado =
        await this.CarroCompraRepository.save(nuevoCarroCompra);
      throw new HttpException(
        {
          message: 'Carro de compras creado exitosamente',
          data: carroCreado,
        },
        HttpStatus.CREATED,
      );
    } else {
      throw new HttpException(
        {
          message: 'El carro de compras ya existe',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }
  }
  //#endregion

  //#region Obtener Carro de Compras por Id Usuario
  async getCarroCompraByIdUsuario(idUsuario: number): Promise<CarroCompra> {
    const carroBuscado = await this.CarroCompraRepository.findOne({
      where: { idUsuario },
      relations: ['detallesCarro', 'detallesCarro.producto'],
    });

    if (!carroBuscado) {
      return null;
    }

    return carroBuscado;
  }
  //#endregion

  //#region Obtener Carro de Compras por Id Carro
  async getCarroByIdCarro(idCarro: number): Promise<CarroCompra> {
    const carroBuscado = await this.CarroCompraRepository.findOne({
      where: { idCarroCompra: idCarro },
    });

    if (!carroBuscado) {
      throw new HttpException(
        { message: 'Carro no encontrado', error: 'Not Found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return carroBuscado;
  }
  //#endregion

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
 