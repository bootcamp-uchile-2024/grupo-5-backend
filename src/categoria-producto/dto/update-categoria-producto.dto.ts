import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoriaProductoDto } from './create-categoria-producto.dto';
import { IsString } from 'class-validator';

export class UpdateCategoriaProductoDto extends PartialType(CreateCategoriaProductoDto) {
    @ApiProperty({
      name: 'idCategoria',
      description: 'Identificador de la Categoria del Producto',
      required: true,
      nullable: false,
      example: 1,
    })
    idCategoria: number;

    @ApiProperty({
      name: 'nombreCategoria',
      description: 'Nombre de la Categoria del Producto',
      required: true,
      maxLength: 80,
      nullable: false,
      example: 'Alimento para Perros',
    })
    @IsString({
      message: 'El Nombre de la Categoria del Producto debe ser un string',
    })
    nombreCategoria: string;
  
      @ApiProperty({
          name: 'descripcionCategoria',
          description: 'Descripción de la Categoria del Producto',
          required: true,
          maxLength: 255,
          nullable: false,
          example: 'Productos alimenticios para perros',
      })
      @IsString({
          message: 'La Descripción de la Categoria del Producto debe ser un string',
      })
      descripcionCategoria: string;
  }
  