import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { ApiProperty } from '@nestjs/swagger';

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
   public nombre: string;

   @ApiProperty({
        type: 'string', 
        title: 'Marca del Producto',
        description: 'Nombre de la Marca del Producto',
        required: true,
        maxLength: 20,  
        nullable: false,
        example: 'Royal Canin'}) 
    public marca: string;

    @ApiProperty({
        type: 'string', 
        title: 'Descripción del Producto',
        description: 'Breve descripción del Producto',
        required: true,
        maxLength: 500,  
        nullable: false,
        example: 'Royal Canin Medium Junior es un alimento para cachorros de razas medianas (11 a 25 Kg peso adulto) hasta los 12 meses de edad. Con una combinación exclusiva de nutrientes para garantizar una seguridad digestiva óptima y favorecer el equilibrio de la flora intestinal, con prebióticos, contribuyendo así a mejorar la calidad de las heces.'}) 
    public descripcion: string;

    @ApiProperty({
        type: 'number', 
        title: 'Precio del Producto',
        description: 'Precio del Producto en Pesos CLP ',
        required: true,
        maxLength: 10,  
        nullable: false,
        example: '86990'}) 
    public precio: number;

    @ApiProperty({
        type: 'string[]', 
        title: 'Imágenes del Producto',
        description: 'Imágenes del Producto', 
        required: true,
        maxLength: 255,  
        nullable: false,
        example: ['images/2653_001.jpg', 'images/2653_002.jpg']}) 
   public imagenes: string[];

    @ApiProperty({
        type: 'string[]', 
        title: 'Etiquetas del Producto', 
        description: 'Lista de Etiquetas del Producto', 
        required: true,
        nullable: false,
        example: ['Royal Canin', 'Adutlo', 'Chihuahua', 'Vitaminas E y C']}) 
    public etiquetas: string[];

    @ApiProperty({
        type: 'string', 
        title: 'Categoria del Producto',
        description: 'Categoria del Producto', 
        required: true,
        maxLength: 80,  
        nullable: false,
        example: 'Alimento Seco Perros'}) 
    public categoria: string;
   
    @ApiProperty({
        type: 'number', 
        title: 'Stock del Producto',
        description: 'Stock del Producto en Unidades', 
        required: true,
        minimum: 0,
        maximum: 10000,
        maxLength: 10,  
        nullable: false,
        example: 150}) 
    public stock: number;

    @ApiProperty({
        type: 'string', 
        title: 'Ingredientes del Producto',
        description: 'Lista de Ingredientes del Producto', 
        required: true,
        maxLength: 500,  
        nullable: false,
        example: 'Maíz, harina de subproductos de pollo, grasas animales (vacuna y pollo), proteína vegetal purificada (L.I.P.*), harina de carne vacuna (L.I.P.*), arroz, harina de trigo, pulpa de remolacha, hidrolizado de hígado de pollo, harina de gluten de maíz, sales minerales, aceite de pescado, vitaminas, aceite vegetal (con aceite de borraja), zeolita, levadura de cerveza, L-lisina, fructo-oligosacáridos (FOS), oligoelementos, taurina, DL-metionina, mananooligosacáridos (MOS), oligoelementos quelados, extracto de rosa de la India (rico en luteína). (*) Low Indigestible Protein: proteína seleccionada por su alta asimilación.'}) 
   public ingredientes: string;

   @ApiProperty({
        type: 'string', 
        title: 'Tamaño del Producto',
        description: 'Tamaño del Producto', 
        required: true,
        maxLength: 20,  
        nullable: false,
        example: '15 Kg'}) 
   public tamanio: string;
   
   @ApiProperty({
        type: 'string', 
        title: 'Origen del Producto',
        description: 'Origen del Producto',
        required: true,
        maxLength: 50,  
        nullable: false,
        example: 'Francia'}) 
   public origen: string;

   @ApiProperty({
        type: 'string', 
        title: 'Vida Útil del Producto',
        description: 'Vida Útil del Producto',
        required: true,
        maxLength: 20,  
        nullable: false,
        example: '12 meses'}) 
   public vidaUtil: string;

   @ApiProperty({
        type: 'string', 
        title: 'Recomendaciones del Producto',
        description: 'Recomendaciones del Producto',
        required: true,
        maxLength: 80,  
        nullable: false,
        example: 'Solo para cachorros'}) 
   public recomendacionesUso: string;
}
