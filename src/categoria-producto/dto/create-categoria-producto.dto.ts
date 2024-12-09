import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaProductoDto {
  @ApiProperty({
    name: 'nombreCategoria',
    description: 'Nombre de la Categoría del Producto',
    required: true,
    maxLength: 80,
    nullable: false,
    example: 'Alimento para Gatos',
  })
  @IsString({
    message: 'El Nombre de la Categoría del Producto debe ser un string',
  })
  @IsNotEmpty({ 
    message: 'El Nombre de la Categoría del Producto no puede ser vacío'
   })
  nombreCategoria: string;

    @ApiProperty({
        name: 'descripcionCategoria',
        description: 'Descripción de la Categoría del Producto',
        required: true,
        maxLength: 255,
        nullable: false,
        example: 'Alimento para Gatos de todas las edades',
    })
    @IsString({
        message: 'La Descripción de la Categoría del Producto debe ser un string',
    })
    @IsNotEmpty({
        message: 'La Descripción de la Categoría del Producto no puede ser vacío'
    })
    descripcionCategoria: string;
}
