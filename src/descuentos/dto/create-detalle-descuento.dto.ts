import { ApiProperty } from '@nestjs/swagger';

export class CreateDetalleDescuentoDto {
  @ApiProperty({
    title: 'Identificador del descuento',
    name: 'idDescuento',
    description: 'Identificador del descuento',
    example: 1,
    type: 'number',
    nullable: false,
  })
  idDescuento: number;

  @ApiProperty({
    title: 'Identificador de la categoría',
    name: 'idCategoria',
    description: 'Identificador de la categoría',
    example: 1,
    type: 'number',
    nullable: true,
  })
  idCategoria: number;

  @ApiProperty({
    title: 'Identificador de la marca',
    name: 'idMarca',
    description: 'Identificador de la marca',
    example: 1,
    type: 'number',
    nullable: true,
  })
  idMarca: number;

  @ApiProperty({
    title: 'Identificador del producto',
    name: 'idProducto',
    description: 'Identificador del producto',
    example: 1,
    type: 'number',
    nullable: true,
  })
  idProducto: number;
}
