import { IsInt, IsArray, IsNumber, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearCarroCompraDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CrearItemDto)
  items: CrearItemDto[];

  @IsNumber()
  @IsOptional()
  precioTotal?: number;
}

// DTO para representar cada item en el carrito
export class CrearItemDto {
  @IsInt()
  idProducto: number;

  @IsInt()
  cantidad: number;

  @IsNumber()
  precioUnitario: number;
}
