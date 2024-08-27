import { ApiProperty } from "@nestjs/swagger";

export class CreateProductoDto {

    @ApiProperty({type: 'string', title: 'Nombre del Producto',description: 'Nombre del Producto',required: true,example: 'Proplan Cachorro'})
    public nombre: string;

    @ApiProperty({type: 'string', title: 'Descripción del Producto',description: 'Descripción del Producto',required: true,example: 'Proplan Cachorro  de 3 a 12 meses - 15 Kg'})
    public descripcion: string;

    @ApiProperty({type: 'number', title: 'Precio del Producto',description: 'Precio del Producto',required: true,example: 54000})
    public precio: number;

    @ApiProperty({type: 'string', title: 'Etiquetas Producto', description: 'Etiquetas de clasificación del producto', required: true, example: ['perro', 'gato', 'cachorro']})
    public etiquetas: string;

    @ApiProperty({type: 'number', title: 'Stock Producto', description: 'Cantidad de stock disponible', required: true, example: 1550})
    public stock: number;

}
