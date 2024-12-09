import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMarcaProductoDto {
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
