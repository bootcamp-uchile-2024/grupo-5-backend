import { ApiProperty } from '@nestjs/swagger';
import { ImagenProducto } from '../entities/imagenproducto.entity';

export class GetProductoDto {
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
  public nombreProducto: string;

  @ApiProperty({
    type: 'string',
    title: 'Marca del Producto',
    description: 'Nombre de la Marca del Producto',
  })
  public marcaProducto: string;

  @ApiProperty({
    type: 'number',
    title: 'Precio del Producto',
    description: 'Precio del Producto en Pesos CLP ',
  })
  public precioProducto: number;

  @ApiProperty({
    type: 'number',
    title: 'Stock del Producto',
    description: 'Stock del Producto ',
  })
  public stockProducto: number;
  
  @ApiProperty({
    type: 'string',
    title: 'Descripción del Producto',
    description: 'Breve descripción del Producto',
  })
  public descripcionProducto: string;


  @ApiProperty({
    type: 'string',
    title: 'Peso del Producto',
    description: 'Peso del Producto ',
  })
  public pesoProducto: string;

  @ApiProperty({
    type: 'string',
    title: 'Tamaño del Producto',
    description: 'Tamaño del Producto ',
  })
  public tamanioProducto: string;

  @ApiProperty({
    type: 'string',
    title: 'Ingredientes del Producto',
    description: 'Lista de Ingredientes del Producto',
  })
  public ingredientesProducto: string;

  @ApiProperty({
    type: 'string',
    title: 'Material del Producto',
    description: 'Material del Producto',
  })
  public materialProducto: string;


  @ApiProperty({
    type: 'string[]',
    title: 'Imágenes del Producto',
    description: 'Imágenes del Producto',
  })
  public imagenesProducto: ImagenProducto[];


  @ApiProperty({
    type: 'string',
    title: 'Categoria del Producto',
    description: 'Categoría del Producto',
  })
  public categoriaProducto: string;

  @ApiProperty({
    type: 'number',
    title: 'Estado del Producto',
    description: 'Estado del Producto',
  })
  public activo: number;

  // @ApiProperty({
  //     type: 'string[]',
  //     title: 'Etiquetas del Producto',
  //     description: 'Lista de Etiquetas del Producto'})
  // public etiquetas: string[];
}
