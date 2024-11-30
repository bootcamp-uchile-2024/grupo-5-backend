import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCarrocompraDto } from './dto/update-carro-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarroCompraDto } from './dto/create-carro-compra.dto';
import { carroCompraMapper } from './mapper/carro-compra.mapper';
import { CarroCompra } from './entities/carro-compra.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class CarroCompraService {
  constructor(
    @InjectRepository(CarroCompra)
    private CarroCompraRepository: Repository<CarroCompra>,
    private readonly usuarioService: UsuariosService,
  ) {}

  async create(
    id_usuario: number,
    carroCompra: CreateCarroCompraDto,
  ): Promise<CarroCompra> {
    const usuarioExiste = await this.usuarioService.findUsuarioById(id_usuario);
    if (!usuarioExiste) {
      throw new HttpException(
        { message: 'Usuario no encontrado', error: 'Not Found' },
        HttpStatus.NOT_FOUND,
      );
    }
    const getCarroCompraByIdUsuario =
      await this.getCarroCompraByIdUsuario(id_usuario);

    if (!getCarroCompraByIdUsuario) {
      const nuevoCarroCompra =
        carroCompraMapper.dtoToCarroCompraEntity(carroCompra);
      nuevoCarroCompra.idUsuario = id_usuario;
      console.log('nuevoCarroCompra: ', nuevoCarroCompra);
      const carroCrado =
        await this.CarroCompraRepository.save(nuevoCarroCompra);
      throw new HttpException(
        { message: 'Carro de compras creado exitosamente', data: carroCrado },
        HttpStatus.CREATED,
      );
    } else {
      throw new HttpException(
        { message: 'El carro de compras ya existe', error: 'Conflict' },
        HttpStatus.CONFLICT,
      );
    }
  }

  async getCarroCompraByIdUsuario(idUsuario: number): Promise<CarroCompra> {
    console.log('getCarroCompraByIdUsuario: ', idUsuario);
    const carroBuscado = await this.CarroCompraRepository.findOne({
      where: { idUsuario },
      relations: ['detallesCarro', 'detallesCarro.producto'],
    });

    if (!carroBuscado) {
      return null; 
    }

    return carroBuscado; 
  }

  async getCarroByIdCarro(idCarro: number): Promise<CarroCompra> {
    const carroBuscado = await this.CarroCompraRepository.findOne({
      where: { idCarroCompra: idCarro },
    });

    if (!carroBuscado) {
      throw new HttpException(
        { message: 'Carro no encontrado', error: 'Not Found' },
        HttpStatus.NOT_FOUND,
      ); // 404
    }

    // throw new HttpException({message: 'Carro buscado no existe', error: "Bas Request" }, HttpStatus.BAD_REQUEST); // 400

    return carroBuscado;
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
