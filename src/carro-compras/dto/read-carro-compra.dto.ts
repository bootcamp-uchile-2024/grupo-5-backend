import { ApiProperty } from '@nestjs/swagger';
import { ReadDetalleCarroCompraDto } from '../../detalle-carro-compras/dto/read-detalle-carro-compra.dto';
import { DetalleCarroCompra } from 'src/detalle-carro-compras/entities/detalle-carro-compra.entity';

export class ReadCarroComprasDto {
  @ApiProperty({ description: 'Identificador único del carrito de compras' })
  idCarroCompra: number;

  @ApiProperty({ description: 'Fecha de creación del carrito' })
  fechaCreacion: Date;

  @ApiProperty({ description: 'Precio total del carrito de compras' })
  precioTotal: number;

  @ApiProperty({
    description: 'Identificador del usuario que posee el carrito',
  })
  idUsuario: number;

  @ApiProperty({
    description: 'Lista de detalles de los productos en el carrito',
  })
  detalleCarro: DetalleCarroCompra[];
}
