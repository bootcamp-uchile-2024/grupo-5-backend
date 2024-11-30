import { Producto } from 'src/productos/entities/producto.entity';
import { CreateDetalleCarroCompraDto } from '../dto/create-detalle-carro-compra.dto';
import { DetalleCarroCompra } from '../entities/detalle-carro-compra.entity';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';

export class detalleCarroCompraMapper {
  static entityToCreateDetalleCarroCompraDto(
    entity: DetalleCarroCompra,
  ): CreateDetalleCarroCompraDto {
    const dto = new CreateDetalleCarroCompraDto();

    dto.idCarroCompra = entity.carroCompra.idCarroCompra;
    dto.idProducto = entity.producto.idProducto;
    dto.cantidad = entity.cantidad;
    dto.precioUnitario = entity.precioUnitario;
    return dto;
  }

  static dtoToDetalleCarroCompraEntity(dto: CreateDetalleCarroCompraDto): DetalleCarroCompra {
    const entity = new DetalleCarroCompra();
    const carroCompra = new CarroCompra();
    carroCompra.idCarroCompra = dto.idCarroCompra;
    
    const producto = new Producto();
    producto.idProducto = dto.idProducto;
    
    entity.carroCompra = carroCompra;
    entity.producto = producto;
    entity.cantidad = dto.cantidad;
    entity.precioUnitario = dto.precioUnitario;
    return entity;
  }

  static entityListToDtoList(entityList: DetalleCarroCompra[]): CreateDetalleCarroCompraDto[] {
    const dtoList: CreateDetalleCarroCompraDto[] = [];
    entityList.forEach((entity) => {
      dtoList.push(this.entityToCreateDetalleCarroCompraDto(entity));
    });
    return dtoList
  }
}
