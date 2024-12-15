import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Repository } from 'typeorm';
import { CreateDetalleCarroCompraDto } from './dto/create-detalle-carro-compra.dto';
import { UpdateDetalleCarrocompraDto } from './dto/update-detalle-carro-compra.dto';
import { DetalleCarroCompra } from './entities/detalle-carro-compra.entity';
import { detalleCarroCompraMapper } from './mapper/detalle-carro-compra.mapper';
import { ReadCarroComprasDto } from 'src/carro-compras/dto/read-carro-compra.dto';
import { CarroCompraMapper } from 'src/carro-compras/mapper/carro-compra.mapper';

@Injectable()
export class DetalleCarroComprasService {
  constructor(
    @InjectRepository(DetalleCarroCompra)
    private detalleCarroCompraRepository: Repository<DetalleCarroCompra>,
    @InjectRepository(CarroCompra)
    private carroCompraRepository: Repository<CarroCompra>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  //#region Agregar Producto Al Carro de Compras
  async agregarProducto(
    idCarroCompra: number,
    idProducto: number,
  ): Promise<ReadCarroComprasDto> {
    try {
      // Buscar el carro de compra
      const carroCompra = await this.carroCompraRepository.findOne({
        where: { idCarroCompra: idCarroCompra },
        relations: ['usuario', 'detallesCarro'],
      });

      if (!carroCompra) {
        throw new NotFoundException('No se encontró el carro de compras');
      }

      // VaLidar si producto existe
      const producto = await this.productoRepository.findOne({
        where: { idProducto: idProducto },
      });

      if (!producto) {
        throw new NotFoundException({
          message: `No se encontró el producto con ID ${idProducto} en el carro de compras`,
        });
      }

      // Validar si el producto ya fue agregado al carro
      const detalleCarroCompraExistente =
        await this.detalleCarroCompraRepository.findOne({
          where: {
            carroCompra: { idCarroCompra: idCarroCompra },
            producto: { idProducto: idProducto },
          },
        });

      if (detalleCarroCompraExistente) {
        return this.incrementarProductoEnCarro(idCarroCompra, idProducto);
      }

      // Crear el DTO para el detalle del carro
      const createDetalleCarroCompraDto: CreateDetalleCarroCompraDto = {
        idCarroCompra: idCarroCompra,
        idProducto: idProducto,
        precioUnitario: producto.precio,
      };

      // Mapear el DTO a la entidad
      const detalleCarroCompra: DetalleCarroCompra =
        detalleCarroCompraMapper.dtoCreateToDetalleCarroCompraEntity(
          createDetalleCarroCompraDto,
        );

      // Asignar el carro de compra al detalle
      detalleCarroCompra.carroCompra.idCarroCompra = idCarroCompra;

      // Guardar el detalle en la base de datos
      await this.detalleCarroCompraRepository.save(detalleCarroCompra);

      // Calcular el precio total del carro
      const carroUpdated = await this.getCarroUpdated(carroCompra);

      return carroUpdated;
    } catch (error) {
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
            'Ha ocurrido un error al intentar eliminar el detalle del carro de compras.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Incrementar Cantidad de Producto ya Agregado al Carro de Compras
  async incrementarProductoEnCarro(
    idCarroCompra: number,
    idProducto: number,
  ): Promise<ReadCarroComprasDto> {
    try {
      // Obtener Carro de Compras
      const carroCompra = await this.carroCompraRepository.findOne({
        where: { idCarroCompra: idCarroCompra },
        relations: ['usuario', 'detallesCarro'],
      });
      // Buscar el detalle del carro
      const detalleCarroCompra =
        await this.detalleCarroCompraRepository.findOne({
          where: {
            carroCompra: { idCarroCompra: idCarroCompra },
            producto: { idProducto: idProducto },
          },
        });

      // Si no existe, lanzar excepción
      if (!detalleCarroCompra) {
        throw new NotFoundException({
          message: `No se encontró el producto con ID ${idProducto} en el carro de compras`,
        });
      }

      // Actualizar la cantidad del producto
      detalleCarroCompra.cantidad += 1;

      // Guardar el detalle en la base de datos
      await this.detalleCarroCompraRepository.save(detalleCarroCompra);

      // Calcular el precio total del carro
      const carroUpdated = await this.getCarroUpdated(carroCompra);

      return carroUpdated;
    } catch (error) {
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
            'Ha ocurrido un error al intentar eliminar el detalle del carro de compras.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Disminuir Cantidad de Producto ya Agregado al Carro de Compras
  async disminuirProductoEnCarro(
    idCarroCompra: number,
    idProducto: number,
  ): Promise<ReadCarroComprasDto> {
    try {
      // Obtener Carro de Compras
      const carroCompra = await this.carroCompraRepository.findOne({
        where: { idCarroCompra: idCarroCompra },
        relations: ['usuario', 'detallesCarro'],
      });
      // Buscar el detalle del carro
      const detalleCarroCompra =
        await this.detalleCarroCompraRepository.findOne({
          where: {
            carroCompra: { idCarroCompra: idCarroCompra },
            producto: { idProducto: idProducto },
          },
        });

      if (!detalleCarroCompra) {
        throw new NotFoundException({
          message: `No se encontró el producto con ID ${idProducto} en el carro de compras`,
        });
      }

      // Validar si la cantidad es 1
      if (detalleCarroCompra.cantidad === 1) {
        await this.quitarProductoDelCarro(idCarroCompra, idProducto);
        // Calcular el precio total del carro
        const carroUpdated = await this.getCarroUpdated(carroCompra);
        return carroUpdated;
      }

      // Actualizar la cantidad
      detalleCarroCompra.cantidad -= 1;

      // Guardar el detalle en la base de datos
      await this.detalleCarroCompraRepository.save(detalleCarroCompra);

      // Calcular el precio total del carro
      const carroUpdated = await this.getCarroUpdated(carroCompra);

      return carroUpdated;
    } catch (error) {
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
            'Ha ocurrido un error al intentar eliminar el detalle del carro de compras.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Eliminar Producto del Carro de Compras
  async quitarProductoDelCarro(
    idCarroCompra: number,
    idProducto: number,
  ): Promise<ReadCarroComprasDto> {
    try {
      // Obtener Carro de Compras
      const carroCompra = await this.carroCompraRepository.findOne({
        where: { idCarroCompra: idCarroCompra },
        relations: ['usuario', 'detallesCarro'],
      });
      // Buscar el detalle del carro
      const detalleCarroCompra =
        await this.detalleCarroCompraRepository.findOne({
          where: {
            carroCompra: { idCarroCompra: idCarroCompra },
            producto: { idProducto: idProducto },
          },
        });

      if (!detalleCarroCompra) {
        throw new NotFoundException({
          message: `No se encontró el producto con ID ${idProducto} en el carro de compras`,
        });
      }

      // Eliminar el detalle del carro
      await this.detalleCarroCompraRepository.delete({
        carroCompra: { idCarroCompra: idCarroCompra },
        producto: { idProducto: idProducto },
      });

      // Calcular el precio total del carro
      const carroUpdated = await this.getCarroUpdated(carroCompra);

      return carroUpdated;
    } catch (error) {
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
            'Ha ocurrido un error al intentar eliminar el detalle del carro de compras.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Calcular Total Carro de Compras
  async calcularTotalCarro(idCarroCompra: number): Promise<number> {
    const resultado = await this.detalleCarroCompraRepository
      .createQueryBuilder('d')
      .select('d.IDCARROCOMPRAS')
      .addSelect('SUM(d.PRECIOUNITARIO * d.CANTIDAD)', 'PRECIO_TOTAL')
      .where('d.IDCARROCOMPRAS = :idCarroCompra', { idCarroCompra })
      .groupBy('d.IDCARROCOMPRAS')
      .getRawOne();

    return resultado ? resultado.PRECIO_TOTAL : 0;
  }
  //#endregion

  //#region Obtener Carro de Compras Actualizado
  async getCarroUpdated(
    carroCompra: CarroCompra,
  ): Promise<ReadCarroComprasDto> {
    const idCarroCompra = carroCompra.idCarroCompra;
    //Obtner Carro Actualizado
    const carroActual = await this.carroCompraRepository.findOne({
      where: { idCarroCompra: idCarroCompra },
      relations: ['usuario', 'detallesCarro'],
    });

    // Calcular el precio total del carro
    const totalCarro = await this.calcularTotalCarro(idCarroCompra);
    const carroUpdated = CarroCompraMapper.entityToReadCarroCompraDto(
      carroActual,
      totalCarro,
    );
    return carroUpdated;
  }
  //#endregion

  //#region Listar Detalles del Carro de Compras por Id Carro
  obtenerDetalleCarroPorIdCarro(
    idCarroCompras: number,
  ): Promise<DetalleCarroCompra[]> {
    return this.detalleCarroCompraRepository.find({
      where: { carroCompra: { idCarroCompra: idCarroCompras } },
      relations: ['idCarroCompra', 'idProducto'],
    });
  }
  //#endregion
}
