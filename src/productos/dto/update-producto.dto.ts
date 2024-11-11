import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { ImagenProducto } from '../entities/imagenproducto.entity';

export class ActualizarProductoDto extends PartialType(CreateProductoDto) {
  // @ApiProperty({
  //     type: 'number',
  //     title: 'Id del Producto',
  //     description: 'Identificador del Producto',
  //     required: true,example: 23})
  // public id: number;

  @ApiProperty({
    type: 'string',
    title: 'Nombre del Producto',
    description: 'Nombre del Producto',
    required: true,
    maxLength: 80,
    nullable: false,
    example: 'Royal Canin Cachorro Medium Puppy alimento para perro',
  })
  @IsString({ message: 'El Nombre del Producto debe ser un string' })
  @Length(1, 80, {
    message: 'El Nombre del Producto debe tener entre 1 y 80 caracteres.',
  })
  public nombre: string;

  @ApiProperty({
    type: 'string',
    title: 'Marca del Producto',
    description: 'Nombre de la Marca del Producto',
    required: true,
    maxLength: 20,
    nullable: false,
    example: 'Royal Canin',
  })
  @IsString({ message: 'La Marca del Producto debe ser un string' })
  @Length(1, 20, {
    message: 'La Marca del Producto debe tener entre 1 y 20 caracteres.',
  })
  @IsNotEmpty({ message: 'La Marca del producto no puede estar vacía' })
  public marca: string;

  @ApiProperty({
    type: 'string',
    title: 'Descripción del Producto',
    description: 'Breve descripción del Producto',
    required: true,
    maxLength: 500,
    nullable: false,
    example:
      'Royal Canin Medium Junior es un alimento para cachorros de razas medianas (11 a 25 Kg peso adulto) hasta los 12 meses de edad. Con una combinación exclusiva de nutrientes para garantizar una seguridad digestiva óptima y favorecer el equilibrio de la flora intestinal, con prebióticos, contribuyendo así a mejorar la calidad de las heces.',
  })
  @IsString({ message: 'La Descripción del Producto debe ser un string' })
  @Length(1, 500, {
    message: 'La Descripción del Producto debe tener entre 1 y 500 caracteres.',
  })
  @IsNotEmpty({ message: 'La Descripción del Producto no puede estar vacía' })
  public descripcion: string;

  @ApiProperty({
    type: 'string',
    title: 'SKU del Producto',
    description: 'SKU del Producto',
    required: true,
    maxLength: 8,
    nullable: false,
    example: 'ATRC1927',
  })
  @IsString({ message: 'El SKU Producto debe ser un string' })
  @Length(1, 8, {
    message: 'El SKU del Producto debe tener entre 1 y 8 caracteres.',
  })
  @IsNotEmpty({ message: 'El SKU del Producto no puede estar vacío' })
  public sku: string;

  @ApiProperty({
    type: 'number',
    title: 'Precio del Producto',
    description: 'Precio del Producto en Pesos CLP ',
    required: true,
    minimum: 1,
    maximum: 10000000,
    maxLength: 10,
    nullable: false,
    example: '86990',
  })
  @IsNumber({}, { message: 'El Precio del Producto debe ser un número' })
  @IsNotEmpty({ message: 'El Precio del Producto no puede estar vacío' })
  @Min(1, { message: 'El Precio del Producto debe ser al menos 1 peso.' })
  @Max(10000000, {
    message: 'El Precio del Producto no debe exceder los  10000000.',
  })
  public precio: number;

  @ApiProperty({
    type: 'number',
    title: 'Stock del Producto',
    description: 'Stock del Producto ',
    required: true,
    minimum: 1,
    maximum: 10000000,
    maxLength: 10,
    nullable: false,
    example: '1200',
  })
  @IsNumber({}, { message: 'El Stock del Producto debe ser un número' })
  @IsNotEmpty({ message: 'El Stock del Producto no puede estar vacío' })
  @Min(1, { message: 'El Stock del Producto debe ser al menos 1 unidad.' })
  @Max(10000000, {
    message: 'El Stock del Producto no debe exceder los  10000000.',
  })
  public stock: number;

  @ApiProperty({
    type: 'string',
    title: 'Peso del Producto',
    description: 'Peso del Producto ',
    required: true,
    maxLength: 20,
    nullable: true,
    example: '12 Kg',
  })
  @IsString({ message: 'El Peso del Producto debe ser un string' })
  public peso: string;

  @ApiProperty({
    type: 'string',
    title: 'Tamaño del Producto',
    description: 'Tamaño del Producto ',
    required: true,
    maxLength: 20,
    nullable: true,
    example: '12 Kg',
  })
  @IsString({ message: 'El Tamaño del Producto debe ser un string' })
  public tamanio: string;

  @ApiProperty({
    type: 'string',
    title: 'Ingredientes del Producto',
    description: 'Lista de Ingredientes del Producto',
    required: false,
    maxLength: 1000,
    nullable: true,
    example: 'Arcilla aglutinante.',
  })
  @IsString({ message: 'Los Ingredientes del Producto debe ser un string' })
  @Length(1, 1000, {
    message:
      'Los Ingredientes del Producto debe tener entre 1 y 1000 caracteres.',
  })
  public ingredientes: string;

  @ApiProperty({
    type: 'string[]',
    title: 'Imágenes del Producto',
    description: 'Imágenes del Producto',
    required: true,
    maxLength: 255,
    nullable: false,
    example: ['images/2653_001.jpg', 'images/2653_002.jpg'],
  })
  @IsArray({
    message:
      'La Ruta de las Imágenes del Producto deben ser un arreglo de strings',
  })
  // @Length(1, 255, { message: 'El tamaño de la Ruta de las Imágenes debe tener entre 1 y 255 caracteres.' })
  @ArrayNotEmpty({
    message: 'El arreglo de rutas de imágenes no puede estar vacío.',
  })
  @IsString({
    each: true,
    message: 'Cada ruta de imagen debe ser una cadena de texto.',
  })
  public imagenes: ImagenProducto[];

  @ApiProperty({
    type: 'string',
    title: 'Categoria del Producto',
    description: 'Categoría del Producto',
    required: true,
    maxLength: 100,
    nullable: false,
    example: 'Alimento Seco Perros',
  })
  @IsString({ message: 'La Categoría del Producto debe ser un string' })
  @Length(1, 100, {
    message: 'La Categoría del Producto debe tener entre 1 y 100 caracteres.',
  })
  @IsNotEmpty({ message: 'La Categoría del Producto no puede estar vacía' })
  public categoria: string;

  // @ApiProperty({
  //     type: 'string[]',
  //     title: 'Etiquetas del Producto',
  //     description: 'Lista de Etiquetas del Producto',
  //     required: true,
  //     nullable: false,
  //     example: ['Royal Canin', 'Adutlo', 'Chihuahua', 'Vitaminas E y C']})
  //     @IsArray({message: 'Las Etiquetas del Producto deben ser un array de strings'})
  //     @IsNotEmpty({message: 'Las Etiquetas del producto no pueden estar vacías'})
  // public etiquetas: string[];
}
