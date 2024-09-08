import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

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
        example: 'Royal Canin Cachorro Medium Puppy alimento para perro'}) 
    @IsString({message: 'El Nombre del Producto debe ser un string'})
    @Length(1, 80, { message: 'El Nombre del Producto debe tener entre 1 y 80 caracteres.' })
   public nombre: string;
   

   @ApiProperty({
        type: 'string', 
        title: 'Marca del Producto',
        description: 'Nombre de la Marca del Producto',
        required: true,
        maxLength: 20,  
        nullable: false,
        example: 'Royal Canin'}) 
    @IsString({message: 'La Marca del Producto debe ser un string'})
    @Length(1, 20, { message: 'La Marca del Producto debe tener entre 1 y 20 caracteres.' })
    @IsNotEmpty({message: 'La Marca del producto no puede estar vacía'})
    public marca: string;

    @ApiProperty({
        type: 'string', 
        title: 'Descripción del Producto',
        description: 'Breve descripción del Producto',
        required: true,
        maxLength: 500,  
        nullable: false,
        example: 'Royal Canin Medium Junior es un alimento para cachorros de razas medianas (11 a 25 Kg peso adulto) hasta los 12 meses de edad. Con una combinación exclusiva de nutrientes para garantizar una seguridad digestiva óptima y favorecer el equilibrio de la flora intestinal, con prebióticos, contribuyendo así a mejorar la calidad de las heces.'}) 
    @IsString({message: 'La Descripción del Producto debe ser un string'})
    @Length(1, 500, { message: 'La Descripción del Producto debe tener entre 1 y 500 caracteres.' })
    @IsNotEmpty({message: 'La Descripción del Producto no puede estar vacía'})
    public descripcion: string;

    @ApiProperty({
        type: 'number', 
        title: 'Precio del Producto',
        description: 'Precio del Producto en Pesos CLP ',
        required: true,
        minimum: 1,
        maximum: 10000000,
        maxLength: 10,  
        nullable: false,
        example: '86990'}) 
    @IsNumber({}, {message: 'El Precio del Producto debe ser un número'})
    @IsNotEmpty({message: 'El Precio del Producto no puede estar vacío'})
    @Min(1, { message: 'El Precio del Producto debe ser al menos 1 peso.' })
    @Max(10000000, { message: 'El Precio del Producto no debe exceder los  10000000.' })
    public precio: number;

    @ApiProperty({
        type: 'string[]', 
        title: 'Imágenes del Producto',
        description: 'Imágenes del Producto', 
        required: true,
        maxLength: 255,  
        nullable: false,
        example: ['images/2653_001.jpg', 'images/2653_002.jpg']}) 
    @IsArray({message: 'La Ruta de las Imágenes del Producto deben ser un array de strings'})
   // @Length(1, 255, { message: 'El tamaño de la Ruta de las Imágenes debe tener entre 1 y 255 caracteres.' })
    @ArrayNotEmpty({ message: 'El array de rutas de imágenes no puede estar vacío.' })
    @IsString({ each: true, message: 'Cada ruta de imagen debe ser una cadena de texto.' })
   public imagenes: string[];

    @ApiProperty({
        type: 'string[]', 
        title: 'Etiquetas del Producto', 
        description: 'Lista de Etiquetas del Producto', 
        required: true,
        nullable: false,
        example: ['Royal Canin', 'Adutlo', 'Chihuahua', 'Vitaminas E y C']}) 
    @IsArray({message: 'Las Etiquetas del Producto deben ser un array de strings'})
    @IsNotEmpty({message: 'Las Etiquetas del producto no pueden estar vacías'})
    public etiquetas: string[];

    @ApiProperty({
        type: 'string', 
        title: 'Categoria del Producto',
        description: 'Categoría del Producto', 
        required: true,
        maxLength: 80,  
        nullable: false,
        example: 'Alimento Seco Perros'}) 
    @IsString({message: 'La Categoría del Producto debe ser un string'})
    @Length(1, 80, { message: 'La Categoría del Producto debe tener entre 1 y 80 caracteres.' })
    @IsNotEmpty({message: 'La Categoría del Producto no puede estar vacía'})
    public categoria: string;
   
    @ApiProperty({
        type: 'number', 
        title: 'Stock del Producto',
        description: 'Stock del Producto en Unidades', 
        required: true,
        minimum: 0,
        maximum: 100000,
        maxLength: 10,  
        nullable: false,
        example: 150}) 
    @IsNumber({}, {message: 'El Stock del Producto debe ser un número'})
    @IsNotEmpty({message: 'El Stock del Producto no puede estar vacío'})   
    @Min(0, { message: 'El Stock del Producto debe ser al menos 1 unidad.' })
    @Max(100000, { message: 'El Stock del Producto no debe exceder las 100000 unidades.' })  
    public stock: number;

    @ApiProperty({
        type: 'string', 
        title: 'Ingredientes del Producto',
        description: 'Lista de Ingredientes del Producto', 
        required: true,
        maxLength: 1000,  
        nullable: false,
        example: 'Maíz, harina de subproductos de pollo, grasas animales (vacuna y pollo), proteína vegetal purificada (L.I.P.*), harina de carne vacuna (L.I.P.*), arroz, harina de trigo, pulpa de remolacha, hidrolizado de hígado de pollo, harina de gluten de maíz, sales minerales, aceite de pescado, vitaminas, aceite vegetal (con aceite de borraja), zeolita, levadura de cerveza, L-lisina, fructo-oligosacáridos (FOS), oligoelementos, taurina, DL-metionina, mananooligosacáridos (MOS), oligoelementos quelados, extracto de rosa de la India (rico en luteína). (*) Low Indigestible Protein: proteína seleccionada por su alta asimilación.'}) 
    @IsString({message: 'Los Ingredientes del Producto debe ser un string'})
    @Length(1, 1000, { message: 'Los Ingredientes del Producto debe tener entre 1 y 500 caracteres.' })
    @IsNotEmpty({message: 'Los Ingredientes del producto no pueden estar vacíos'})
   public ingredientes: string;

   @ApiProperty({
        type: 'string', 
        title: 'Tamaño del Producto',
        description: 'Tamaño del Producto', 
        required: true,
        maxLength: 20,  
        nullable: false,
        example: '15 Kg'}) 
    @IsString({message: 'El tamaño del Producto debe ser un string'})   
    @Length(1, 20, { message: 'El tamaño del Producto debe tener entre 1 y 20 caracteres.' })
    @IsNotEmpty({message: 'El tamaño del Producto no puede estar vacío'})
   public tamanio: string;
   
   @ApiProperty({
        type: 'string', 
        title: 'Origen del Producto',
        description: 'Origen del Producto',
        required: true,
        maxLength: 50,  
        nullable: false,
        example: 'Francia'}) 
    @IsString({message: 'El Origen del Producto debe ser un string'})
    @Length(1, 50, { message: 'El Origen del Producto debe tener entre 1 y 50 caracteres.' })
    @IsNotEmpty({message: 'El Origen del Producto no puede estar vacío'})
   public origen: string;

   @ApiProperty({
        type: 'string', 
        title: 'Vida Útil del Producto',
        description: 'Vida Útil del Producto',
        required: true,
        maxLength: 20,  
        nullable: false,
        example: '12 meses'}) 
    @IsString({message: 'La Vida Útil del Producto debe ser un string'})
    @Length(1, 20, { message: 'La Vida Útil del Producto debe tener entre 1 y 20 caracteres.' })
    @IsNotEmpty({message: 'La Vida Útil del Producto no puede estar vacía'})
   public vidaUtil: string;

   @ApiProperty({
        type: 'string', 
        title: 'Recomendaciones de Uso',
        description: 'Recomendaciones de Uso del Producto',
        required: true,
        maxLength: 80,  
        nullable: false,
        example: 'Solo para cachorros'}) 
    @IsString({message: 'Las Recomendaciones de Uso del Producto debe ser un string'})
    @Length(1, 80, { message: 'Las Recomendaciones de Uso del Producto debe tener entre 1 y 80 caracteres.' })
    @IsNotEmpty({message: 'Las Recomendaciones de Uso del Producto no pueden estar vacías'})
   public recomendacionesUso: string;
}
