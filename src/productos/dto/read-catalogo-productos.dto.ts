import { ApiProperty } from '@nestjs/swagger';
import { ImagenProducto } from '../entities/imagenproducto.entity';

export class CatalogoProductoDto {
  @ApiProperty({
    type: 'number',
    title: 'Id del Producto',
    description: 'Identificador del Producto',
  })
  public id: number;

  @ApiProperty({
    type: 'string',
    title: 'SKU del Producto',
    description: 'SKU del Producto',
  })
  public sku: string;

  @ApiProperty({
    type: 'string',
    title: 'Nombre del Producto',
    description: 'Nombre del Producto',
  })
  public NombreProducto: string;

  @ApiProperty({
    type: 'string',
    title: 'Marca del Producto',
    description: 'Nombre de la Marca del Producto',
  })
  public MarcaProducto: string;

  @ApiProperty({
    type: 'number',
    title: 'Precio del Producto',
    description: 'Precio del Producto',
  })
  public PrecioProducto: number;

  @ApiProperty({
    type: 'number',
    title: 'Stock del Producto',
    description: 'Stock del Producto ',
  })
  public stock: number;

  @ApiProperty({
    type: 'string',
    title: 'Imágenes del Producto',
    description: 'Imágenes del Producto',
  })
  public ImagenesProducto: ImagenProducto[];
}
