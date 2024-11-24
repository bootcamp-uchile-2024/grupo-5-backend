import { ApiProperty } from '@nestjs/swagger';
import {  IsInt,  IsPositive,  IsNotEmpty,} from 'class-validator';


// DTO para DETALLES_CARRO_COMPRA
export class CreateDetalleCarroCompraDto {
  @ApiProperty({ example: 1, description: 'ID único del detalle del carro de compras' })
  @IsInt({ message: 'Identificador del detalle del carro debe ser un número entero' })
  @IsPositive({ message: 'Identificador del detalle del carro debe ser un número positivo' })
  @IsNotEmpty({ message: 'Identificador del detalle del carro no puede estar vacío' })
  idDetalleCarro: number;

  @ApiProperty({ example: 1, description: 'ID del carro de compras asociado' })
  @IsInt({ message: 'Identificador del carro debe ser un número entero' })
  @IsPositive({ message: 'Identificador del carro debe ser un número positivo' })
  @IsNotEmpty({ message: 'Identificador  del carro no puede estar vacío' })
  idCarroCompras: number;

  @ApiProperty({ example: 1, description: 'ID del producto asociado' })
  @IsInt({ message: 'IDentificador del producto debe ser un número entero' })
  @IsPositive({ message: 'IDentificador del producto debe ser un número positivo' })
  @IsNotEmpty({ message: 'IDentificador del producto no puede estar vacío' })
  idProducto: number;

  @ApiProperty({ example: 2, description: 'Cantidad del producto en el carro' })
  @IsInt({ message: 'Cantidad debe ser un número entero' })
  @IsPositive({ message: 'Cantidad debe ser un número positivo' })
  @IsNotEmpty({ message: 'Cantidad no puede estar vacío' })
  cantidad: number;

  @ApiProperty({ example: 1500, description: 'Precio unitario del producto' })
  @IsInt({ message: 'Precio Unitario debe ser un número entero' })
  @IsPositive({ message: 'Precio Unitario debe ser un número positivo' })
  @IsNotEmpty({ message: 'Precio Unitario no puede estar vacío' })
  precioUnitario: number;
}