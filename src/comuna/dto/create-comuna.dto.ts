import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, isString } from 'class-validator';

export class CreateComunaDto {
  @ApiProperty({
    name: 'idComuna',
    description: 'Identificador de la comuna',
    example: 3000,
  })
  @IsInt({
    message: 'El idcomuna debe ser un entero',
  })
  idComuna: number;

  @ApiProperty({
    name: 'idRegion',
    description: 'Identificador de la región',
    example: 1,
  })
  @IsInt({
    message: 'El idregion debe ser un entero',
  })
  idRegion: number;

  @ApiProperty({
    name: 'nombreComuna',
    description: 'Nombre de la comuna',
    example: 'Santiago',
  })
  @IsString({
    message: 'El nombre comuna debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'Debe completar el campo nombreComuna',
  })
  nombreComuna: string;
}
