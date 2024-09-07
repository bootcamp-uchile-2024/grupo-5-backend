import { ApiProperty } from "@nestjs/swagger";
//import { ProductoDto } from "./create-producto.dto";

//export class ProductoDetalleDto  extends ProductoDto{
export class ProductoDetalleDto {
    @ApiProperty({type: 'number', title: 'Id del Producto',description: 'Identificador del Producto',required: true,example: 23})
     public id: number;
    
    @ApiProperty({type: 'string[]', title: 'Ingredientes del Producto',description: 'Ingredientes del Producto',required: true,example: ['Maiz','Pollo']}) 
    public ingredientes: string[];
    
    
    @ApiProperty({type: 'string', title: 'Tamaño',description: 'Tamaño del Producto', required: true, example: '10 Kg'}) 
    public tamanio: string;

    
    @ApiProperty({type: 'string', title: 'Marca',description: 'Marca del Producto',required: true,example: 'Firulais'}) 
    public marca: string;


    @ApiProperty({type: 'string', title: 'Origen',description: 'Origen del Producto',required: true,example: 'Chile'}) 
    public origen: string;


    @ApiProperty({type: 'string', title: 'Vida util',description: 'Vida util del Producto',required: true,example: '12 meses'}) 
    public vidaUtil: string;


    @ApiProperty({type: 'string', title: 'Recomendaciones',description: 'Recomendaciones del Producto',required: true,example: 'Solo para cachorros'}) 
    public recomendacionesUso: string;

    
    @ApiProperty({type: 'string', title: 'Contenido Neto',description: 'Contenido Neto del Producto',required: true,example: '15000 gramos'}) 
    public contenidoNeto: string;


    @ApiProperty({type: 'string', title: 'Recomendaciones de Amacenamiento',description: 'Recomendaciones de Amacenamiento del Producto',required: true,example: 'Mantener enb lugar fresco'}) 
    public instruccionesAlmacenamiento: string;


    @ApiProperty({type: 'string', title: 'Código de Barras',description: 'Código de Barras  del Producto',required: true,example: '1-9895825705-4'}) 
    public codigoBarras: string;

}