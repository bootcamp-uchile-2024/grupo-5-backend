import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateMarcaProductoDto } from './create-marca-producto.dto';

export class UpdateMarcaProductoDto extends PartialType(CreateMarcaProductoDto) {
    @ApiProperty({
        name: 'nombreMarca',
        description: 'Nombre de la Marca del Producto',
        required: true,
        maxLength: 80,
        nullable: false,
        example: 'Royal Canin',
      })
      @IsString({
        message: 'El Nombre de la Marca del Producto debe ser un string',
      })
      @IsNotEmpty({
        message: 'El Nombre de la Marca del Producto no puede estar vacío',
      })
      nombreMarca: string;
}
