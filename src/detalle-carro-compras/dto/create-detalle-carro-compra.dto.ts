import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

// DTO para DETALLES_CARRO_COMPRA
export class CreateDetalleCarroCompraDto {
  @ApiProperty({
    name: 'idCarroCompra',
    description: 'Id del carro de compras',
    example: 1,
  })
  idCarroCompra: number;

  @ApiProperty({
    name: 'idProducto',
    description: 'Id del producto',
    example: 1,
  })
  idProducto: number;

  @ApiProperty({
    name: 'precioUnitario',
    description: 'Precio unitario del producto',
    example: 1000,
  })
  precioUnitario: number;
}
