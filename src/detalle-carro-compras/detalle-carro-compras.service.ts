import { Injectable, NotFoundException } from '@nestjs/common';
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

  async agregarProducto(
    idCarroCompra: number,
    idProducto: number,
    cantidad: number,
  ): Promise<DetalleCarroCompra> {
    console.log('idCarroCompra: ', idCarroCompra);
    console.log('idProducto: ', +idProducto);
    console.log('cantidad: ', cantidad);
    try {
      // Buscar el carro de compra
      const carroCompra = await this.carroCompraRepository.findOne({
        where: { idCarroCompra: idCarroCompra },
      });

      if (!carroCompra) {
        throw new NotFoundException('No se encontró el carro de compras');
      }

      const producto = await this.productoRepository.findOne({
        where: { idProducto: idProducto },
      });

      if (!producto) {
        throw new NotFoundException('No se encontró el producto');
      }

      const createDetalleCarroCompraDto: CreateDetalleCarroCompraDto = {
        idCarroCompra: idCarroCompra,
        idProducto: idProducto,
        cantidad: +cantidad,
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
      this.updatePrecioTotalCarro(idCarroCompra, totalizarDetalleCarro);

      return detalleCarroCompra;
    } catch (error) {
      throw new Error(
        'Ha ocurrido un error al intentar guardar el detalle del carro de compras. Error: ' +
          error,
      );
    }
  }

  async actualizarCantidadProducto( idCarroCompra: number, idProducto: number, cantidad: number,): Promise<DetalleCarroCompra> {
    try {
      // Buscar el detalle del carro
      const detalleCarroCompra = await this.detalleCarroCompraRepository.findOne({
        where: { carroCompra: { idCarroCompra: idCarroCompra }, producto: { idProducto: idProducto } },
      });

      if (!detalleCarroCompra) {
        throw new NotFoundException('No se encontró el detalle del carro de compras');
      }

      // Actualizar la cantidad
      detalleCarroCompra.cantidad = cantidad;

      // Guardar el detalle en la base de datos
      await this.detalleCarroCompraRepository.save(detalleCarroCompra);

      // Calcular el total y actualizar el precio total del carro
      const totalizarDetalleCarro =
        await this.calcularTotalDetalleCarro(idCarroCompra);
      this.updatePrecioTotalCarro(idCarroCompra, totalizarDetalleCarro);

      return detalleCarroCompra;
    } catch (error) {
      throw new Error(
        'Ha ocurrido un error al intentar actualizar la cantidad del detalle del carro de compras. Error: ' +
          error,
      );
    }
  }

 async eliminarProducto(idCarroCompra: number, idProducto: number): Promise<void> {
    try {
      // Buscar el detalle del carro
      const detalleCarroCompra = await this.detalleCarroCompraRepository.findOne({
        where: { carroCompra: { idCarroCompra: idCarroCompra }, producto: { idProducto: idProducto } },
      });

      if (!detalleCarroCompra) {
        throw new NotFoundException('No se encontró el detalle del carro de compras');
      }

      // Eliminar el detalle del carro
      await this.detalleCarroCompraRepository.delete({
        carroCompra: { idCarroCompra: idCarroCompra },
        producto: { idProducto: idProducto }
      });

      // Calcular el total y actualizar el precio total del carro
      const totalizarDetalleCarro =
        await this.calcularTotalDetalleCarro(idCarroCompra);
      this.updatePrecioTotalCarro(idCarroCompra, totalizarDetalleCarro);
    } catch (error) {
      throw new Error(
        'Ha ocurrido un error al intentar eliminar el detalle del carro de compras. Error: ' +
          error,
      );
    }
  }

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

  async updatePrecioTotalCarro(
    idCarroCompra: number,
    precioTotal: number,
  ): Promise<void> {
    await this.carroCompraRepository.update(
      { idCarroCompra: idCarroCompra },
      { precioTotal: precioTotal },
    );
  }


  obtenerDetalleCarroPorIdCarro(
    idCarroCompras: number,
  ): Promise<DetalleCarroCompra[]> {
    return this.detalleCarroCompraRepository.find({
      where: { carroCompra: { idCarroCompra: idCarroCompras } }, 
      relations: ['idCarroCompra', 'idProducto'], 
    });
  }


}
