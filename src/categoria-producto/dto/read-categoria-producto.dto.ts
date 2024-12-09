import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ReadCategoriaProductoDto {
    @ApiProperty({
      name: 'idCategoria',
      description: 'Identificador de la Categoria del Producto',
      example: 1,
      required: true,
      nullable: false,
    })
    idCategoria: number;

    @ApiProperty({
        name: 'nombreCategoria',
        description: 'Nombre de la Categoria del Producto',
        required: true,
        maxLength: 80,
        nullable: false,
        example: 'Alimento para Gatos',
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
            example: 'Alimento para Gatos de todas las edades',
        })
        @IsString({
            message: 'La Descripción de la Categoria del Producto debe ser un string',
        })
        descripcionCategoria: string;
    }
    