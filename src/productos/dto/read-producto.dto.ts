import { ApiProperty } from '@nestjs/swagger';

export class GetProductoDto {
  @ApiProperty({
    type: 'number',
    title: 'Id del Producto',
    description: 'Identificador del Producto',
  })
  public id: number;

  @ApiProperty({
    type: 'string',
    title: 'Nombre del Producto',
    description: 'Nombre del Producto',
  })
  public nombre: string;

  @ApiProperty({
    type: 'string',
    title: 'Marca del Producto',
    description: 'Nombre de la Marca del Producto',
  })
  public marca: string;

  @ApiProperty({
    type: 'string',
    title: 'Descripción del Producto',
    description: 'Breve descripción del Producto',
  })
  public descripcion: string;

  @ApiProperty({
    type: 'string',
    title: 'SKU del Producto',
    description: 'SKU del Producto',
  })
  public sku: string;

  @ApiProperty({
    type: 'number',
    title: 'Precio del Producto',
    description: 'Precio del Producto en Pesos CLP ',
  })
  public precio: number;

  @ApiProperty({
    type: 'number',
    title: 'Stock del Producto',
    description: 'Stock del Producto ',
  })
  public stock: number;

  @ApiProperty({
    type: 'string',
    title: 'Peso del Producto',
    description: 'Peso del Producto ',
  })
  public peso: string;

  @ApiProperty({
    type: 'string',
    title: 'Tamaño del Producto',
    description: 'Tamaño del Producto ',
  })
  public tamanio: string;

  @ApiProperty({
    type: 'string',
    title: 'Ingredientes del Producto',
    description: 'Lista de Ingredientes del Producto',
  })
  public ingredientes: string;

  @ApiProperty({
    type: 'string[]',
    title: 'Imágenes del Producto',
    description: 'Imágenes del Producto',
  })
  public imagenes: string[];

  @ApiProperty({
    type: 'string',
    title: 'Categoria del Producto',
    description: 'Categoría del Producto',
  })
  public categoria: string;

  // @ApiProperty({
  //     type: 'string[]',
  //     title: 'Etiquetas del Producto',
  //     description: 'Lista de Etiquetas del Producto'})
  // public etiquetas: string[];
}
