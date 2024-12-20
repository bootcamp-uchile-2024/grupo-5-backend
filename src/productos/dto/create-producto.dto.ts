import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';
import { ImagenProducto } from '../entities/imagenproducto.entity';

export class CreateProductoDto {
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
  public nombreProducto: string;

  @ApiProperty({
    type: 'number',
    title: 'Identificador de la Marca del Producto',
    description: 'Identificador de la Marca del Producto',
    minimum: 1,
    maximum: 10000000,
    nullable: false,
    example: '1',
  })
  // @IsInt({ message: 'El identificador debe ser un entero.' })
  // @Min(1, { message: 'El identificador debe ser mayor a 0.' })
  public idMarca: number;

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
  // @IsNumber({}, {message: 'El Precio del Producto debe ser un número'})
  // @IsNotEmpty({message: 'El Precio del Producto no puede estar vacío'})
  // @Min(1, { message: 'El Precio del Producto debe ser al menos 1 peso.' })
  // @Max(10000000, { message: 'El Precio del Producto no debe exceder los  10000000.' })
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
  // @IsNumber({}, {message: 'El Stock del Producto debe ser un número'})
  // @IsNotEmpty({message: 'El Stock del Producto no puede estar vacío'})
  // @Min(1, { message: 'El Stock del Producto debe ser al menos 1 unidad.' })
  // @Max(10000000, { message: 'El Stock del Producto no debe exceder los  10000000.' })
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
  // @IsString( {message: 'El Tamaño del Producto debe ser un string'})
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
  public ingredientes: string;

  @ApiProperty({
    type: 'string',
    title: 'Materiales del Producto',
    description: 'Lista Materiales de Ingredientes del Producto',
    required: false,
    maxLength: 1000,
    nullable: true,
    example: 'Arcilla aglutinante.',
  })
  @IsString({ message: 'Los Materiales del Producto debe ser un string' })
  public material: string;

  @ApiProperty({
    type: 'string[]',
    title: 'Imágenes del Producto',
    description: 'Imágenes del Producto',
    required: true,
    maxLength: 255,
    nullable: false,
    example: [
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAYRXhpZgAATU0AKgAAAAgAA1IBAAEA',
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAYRXhpZgAATU0AKgAAAAgAA1IBAAEA',
    ],
  })
//   @IsString()
//   @Matches(/^data:[a-z]+\/[a-z]+;base64,.+/, {
//     message: 'El contenido debe estar en formato Base64 válido.',
//   })
  public imagenes: string[];

  @ApiProperty({
    type: 'number',
    title: 'Identificador Categoria del Producto',
    description: 'Identificador Categoría del Producto',
    required: true,
    minimum: 1,
    maximum: 10000000,
    nullable: false,
    example: '1',
  })
  // @IsInt({ message: 'El identificador debe ser un entero.' })
  // @Min(1, { message: 'El identificador debe ser mayor a 0.' })
  // @IsNotEmpty({message: 'Identificador Categoría del Producto no puede estar vacía'})
  public idCategoria: number;

  @ApiProperty({
    type: 'number',
    title: 'Estado del Producto',
    description: 'Estado del Producto',
    required: true,
    minimum: 0,
    maximum: 1,
    nullable: false,
    example: '1',
  })
  // @IsIn([0, 1], { message: 'El estado del producto debe ser 0 (desactivado) o 1 (activo).' })
  public activo: number;

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
