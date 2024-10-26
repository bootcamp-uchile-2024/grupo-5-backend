import { ApiProperty } from "@nestjs/swagger";

export class DetalleProductoDto {

        @ApiProperty({
            type: 'number', 
            title: 'Id del Producto',
            description: 'Identificador del Producto',
            required: true,
            example: 23})
        public idProducto: number;
    
        @ApiProperty({
            type: 'string', 
            title: 'Nombre del Producto',
            description: 'Nombre del Producto',
            required: true,
            example: 'Proplan Cachorro'})
        public NombreProducto: string;
    
        @ApiProperty({
            type: 'string', 
            title: 'Marca del Producto',
            description: 'Nombre de la Marca del Producto',
            required: true,
            example: 'Proplan'})
        public MarcaProducto: string;
    
    
        @ApiProperty({
            type: 'number', 
            title: 'SKU del Producto',
            description: 'SKU del Producto',
            required: true,
            example: '100090'})
        public SkuProducto: number;
    
        @ApiProperty({
            type: 'string', 
            title: 'Descripción del Producto',
            description: 'Descripción del Producto',
            required: true,
            example: 'Comida para perros adultos de tamaño mediano'})
        public DescripcionProducto: string;
     
        @ApiProperty({
            type: 'string', 
            title: 'Categoría del Producto',
            description: 'Categoría del Producto',
            required: true,
            example: 'Alimento para Perros'})
        public CategoriaProducto: string;
    
        @ApiProperty({
            type: 'string', 
            title: 'Caracteristica del Producto',
            description: 'Caracteristica del Producto',
            required: true,
            example: 'Tipo, Material, Uso'})
        public AECaracteristica: string;

        @ApiProperty({
            type: 'string', 
            title: 'Valor del Producto',
            description: 'Valor del Producto',
            required: true,
            example: 'Juguete interactivo, Goma, Para perros y gatos'})
        public AEValo: string;
        
        @ApiProperty({
            type: 'string', 
            title: 'Presentación del Producto',
            description: 'Presentación del Producto',
            required: true,
            example: 'Presentación: 10000g; Presentación: 1000g; Presentación: 5000g'})
        public PresentacionProducto: string;
    
        @ApiProperty({
            type: 'number', 
            title: 'Stock del Producto',
            description: 'Stock del Producto',
            required: true,
            example: 'Stock: 30;  Stock: 100;  Stock: 50'})
        public StockProducto: string;


        @ApiProperty({
            type: 'number', 
            title: 'Precio del Producto',
            description: 'Precio del Producto',
            required: true,
            example: 'Precio: 35000'})
        public PrecioProducto: number;
    
        
        @ApiProperty({
            type: 'string', 
            title: 'Imágenes del Producto',
            description: 'Imágenes del Producto',
            required: true,
            example: ['images/proplan1.jpg', 'images/proplan2.jpg']})
        public ImagenesProducto: string[];
    }