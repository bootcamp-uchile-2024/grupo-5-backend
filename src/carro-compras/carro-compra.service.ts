import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import { UsuarioService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { CreateCarroCompraDto } from './dto/create-carro-compra.dto';
import { UpdateCarrocompraDto } from './dto/update-carro-compra.dto';
import { CarroCompra } from './entities/carro-compra.entity';
import { CarroCompraMapper } from './mapper/carro-compra.mapper';

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
    // Validar si el usuario existe
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

    // Validar si carro de compras ya existe
    const getCarroCompraByIdUsuario =
      await this.getCarroCompraByIdUsuario(id_usuario);

    // Si no existe, crear carro de compras
    if (!getCarroCompraByIdUsuario) {
      const nuevoCarroCompra =
      CarroCompraMapper.dtoToCarroCompraEntity(carroCompra);

      const usaurio = new Usuario();
      usaurio.idUsuario = id_usuario;

      nuevoCarroCompra.usuario = usaurio;

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
    // Buscar carro de compras por idUsuario
    const carroBuscado = await this.CarroCompraRepository.findOne({
      where: { usuario: { idUsuario: idUsuario } },
      relations: ['detallesCarro', 'detallesCarro.producto'],
    });

    //Obtner Carro Actual
    const carroActual = await this.CarroCompraRepository.findOne({
      where: { usuario: { idUsuario: idUsuario } },
      relations: ['detallesCarro', 'detallesCarro.producto'],
    });

    // Si carro de compra no existe, retornar null
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
