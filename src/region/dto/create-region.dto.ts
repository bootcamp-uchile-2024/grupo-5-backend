import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    name: 'idregion',
    description: 'Identificador de la región',
    example: 1,
  })
  @IsInt({
    message: 'El idregion debe ser un entero',
  })
  idRegion: number;

  @ApiProperty({
    name: 'orden',
    description: 'Orden de la región',
    example: 1,
  })
  @IsInt({
    message: 'El idregion debe ser un entero',
  })
  orden: number;

  @ApiProperty({
    name: 'nombreregion',
    description: 'Nombre de la región',
    example: 'Región de Valparaíso',
  })
  @IsString({
    message: 'El nombre región debe ser una cadena de texto',
  })
  nombreRegion: string;
}
