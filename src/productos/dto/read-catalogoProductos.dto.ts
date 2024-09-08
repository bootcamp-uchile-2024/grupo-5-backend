import { ApiProperty } from "@nestjs/swagger";

export class CatalogoProductoDto {

    @ApiProperty({
        type: 'number', 
        title: 'Id del Producto',
        description: 'Identificador del Producto',
        required: true,
        example: 23})
    public id: number;

    @ApiProperty({
        type: 'string', 
        title: 'Nombre del Producto',
        description: 'Nombre del Producto',
        required: true,
        example: 'Proplan Cachorro'})
    public nombre: string;

    @ApiProperty({
        type: 'string', 
        title: 'Marca del Producto',
        description: 'Nombre de la Marca del Producto',
        required: true,
        example: 'Proplan'})
    public marca: string;

    @ApiProperty({
        type: 'number', 
        title: 'Precio del Producto',
        description: 'Precio del Producto',
        required: true,
        example: 54000})
    public precio: number;

    @ApiProperty({
        type: 'string', 
        title: 'Imágenes del Producto',
        description: 'Imágenes del Producto',
        required: true,
        example: ['images/proplan1.jpg', 'images/proplan2.jpg']})
    public imagenes: string[];
}
