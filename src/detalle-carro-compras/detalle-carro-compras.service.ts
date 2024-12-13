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
  ): Promise<DetalleCarroCompra> {
    console.log('idCarroCompra: ', idCarroCompra);
    console.log('idProducto: ', +idProducto);

    try {
      // Buscar el carro de compra
      const carroCompra = await this.carroCompraRepository.findOne({
        where: { idCarroCompra: idCarroCompra },
      });

      if (!carroCompra) {
        throw new NotFoundException('No se encontró el carro de compras');
      }

      // VaLidar si producto existe
      const producto = await this.productoRepository.findOne({
        where: { idProducto: idProducto },
      });

      if (!producto) {
        throw new NotFoundException('No se encontró el producto');
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
        console.log('E X I T : ');
      }
      console.log('N O - E X I T : ');
      const createDetalleCarroCompraDto: CreateDetalleCarroCompraDto = {
        idCarroCompra: idCarroCompra,
        idProducto: idProducto,
        precioUnitario: producto.precio,
      };

      // Mapear el DTO a la entidad
      const detalleCarroCompra: DetalleCarroCompra =
        detalleCarroCompraMapper.dtoToDetalleCarroCompraEntity(
          createDetalleCarroCompraDto,
        );

      // Asignar el carro de compra al detalle
      detalleCarroCompra.carroCompra.idCarroCompra = idCarroCompra;

      // Guardar el detalle en la base de datos
      await this.detalleCarroCompraRepository.save(detalleCarroCompra);

      // Calcular el total y actualizar el precio total del carro
      const totalizarDetalleCarro =
        await this.calcularTotalDetalleCarro(idCarroCompra);
      //this.updatePrecioTotalCarro(idCarroCompra, totalizarDetalleCarro);

      return detalleCarroCompra;
    } catch (error) {
      throw new Error(
        'Ha ocurrido un error al intentar guardar el detalle del carro de compras. Error: ' +
          error,
      );
    }
  }
  //#endregion

  //#region Incrementar Cantidad de Producto ya Agregado al Carro de Compras
  async incrementarProductoEnCarro(
    idCarroCompra: number,
    idProducto: number,
  ): Promise<DetalleCarroCompra> {
    try {
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
          message: 'No se encontró el detalle del carro de compras',
        });
      }

      // Actualizar la cantidad
      detalleCarroCompra.cantidad += 1;

      // Guardar el detalle en la base de datos
      await this.detalleCarroCompraRepository.save(detalleCarroCompra);

      // Calcular el total y actualizar el precio total del carro
      const totalizarDetalleCarro =
        await this.calcularTotalDetalleCarro(idCarroCompra);
      //this.updatePrecioTotalCarro(idCarroCompra, totalizarDetalleCarro);

      return detalleCarroCompra;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Producto no encontrado en el carro de compras',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //#endregion

    //#region Disminuir Cantidad de Producto ya Agregado al Carro de Compras
    async disminuirProductoEnCarro(
      idCarroCompra: number,
      idProducto: number,
    ): Promise<DetalleCarroCompra> {
      console.log('>>>>>>>> idCarroCompra: ', idCarroCompra);
      console.log('>>>>>>>>>> idProducto: ', +idProducto);
      try {
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
            message: 'No se encontró el detalle del carro de compras',
          });
        }

        // Validar si la cantidad es 1
        if (detalleCarroCompra.cantidad === 1) {
          console.log("validation");
          await  this.quitarProductoDelCarro(idCarroCompra, idProducto);
          return detalleCarroCompra;
        }
  
        // Actualizar la cantidad
        detalleCarroCompra.cantidad -= 1;
  
        // Guardar el detalle en la base de datos
        await this.detalleCarroCompraRepository.save(detalleCarroCompra);
  
        // Calcular el total y actualizar el precio total del carro
        const totalizarDetalleCarro =
          await this.calcularTotalDetalleCarro(idCarroCompra);
        //this.updatePrecioTotalCarro(idCarroCompra, totalizarDetalleCarro);
  
        return detalleCarroCompra;
      } catch (error) {
        throw new HttpException(
          {
            message: 'Producto no encontrado en el carro de compras',
            error: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
    //#endregion

  //#region Eliminar Producto del Carro de Compras
  async quitarProductoDelCarro(
    idCarroCompra: number,
    idProducto: number,
  ): Promise<void> {
    try {
      // Buscar el detalle del carro
      const detalleCarroCompra =
        await this.detalleCarroCompraRepository.findOne({
          where: {
            carroCompra: { idCarroCompra: idCarroCompra },
            producto: { idProducto: idProducto },
          },
        });

      if (!detalleCarroCompra) {
        throw new NotFoundException(
          'Producto no encontrado en el carro de compras.',
        );
      }

      // Eliminar el detalle del carro
      await this.detalleCarroCompraRepository.delete({
        carroCompra: { idCarroCompra: idCarroCompra },
        producto: { idProducto: idProducto },
      });

      // Calcular el total y actualizar el precio total del carro
      const totalizarDetalleCarro =
        await this.calcularTotalDetalleCarro(idCarroCompra);
      //this.updatePrecioTotalCarro(idCarroCompra, totalizarDetalleCarro);
    } catch (error) {
      throw new Error(
        'Ha ocurrido un error al intentar eliminar el detalle del carro de compras. Error: ' +
          error,
      );
    }
  }
  //#endregion

  //#region Calcular Total Carro de Compras
  async calcularTotalDetalleCarro(idCarroCompra: number): Promise<number> {
    const resultado = await this.detalleCarroCompraRepository
      .createQueryBuilder('d')
      .select('d.IDCARROCOMPRAS')
      .addSelect('SUM(d.PRECIOUNITARIO * d.CANTIDAD)', 'PRECIO_TOTAL')
      .where('d.IDCARROCOMPRAS = :idCarroCompra', { idCarroCompra })
      .groupBy('d.IDCARROCOMPRAS')
      .getRawOne();
    console.log('resultado: ', resultado);
    return resultado ? resultado.PRECIO_TOTAL : 0;
  }
  //#endregion

  // async updatePrecioTotalCarro(
  //   idCarroCompra: number,
  //   precioTotal: number,
  // ): Promise<void> {
  //   await this.carroCompraRepository.update(
  //     { idCarroCompra: idCarroCompra },
  //     { precioTotal: precioTotal },
  //   );
  // }

  obtenerDetalleCarroPorIdCarro(
    idCarroCompras: number,
  ): Promise<DetalleCarroCompra[]> {
    return this.detalleCarroCompraRepository.find({
      where: { carroCompra: { idCarroCompra: idCarroCompras } },
      relations: ['idCarroCompra', 'idProducto'],
    });
  }

}
