import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { EstadoDescuento } from '../enum/estado.enum';
import { Type } from 'class-transformer';

export class CreateDescuentoDto {
  @ApiProperty({
    title: 'Nombre Descuento',
    description: 'Nombre del descuento',
    required: true,
    maxLength: 100,
    nullable: false,
    example: 'Descuento de Navidad',
  })
  @IsString({
    message: 'El Nombre del descuento debe ser un string',
  })
  nombreDescuento: string;

  @ApiProperty({
    title: 'Descripción Descuento',
    description: 'Descripción del descuento',
    required: false,
    maxLength: 1000,
    nullable: true,
    example: 'Descuento de Navidad',
  })
  @IsString({ message: 'La descripción del descuento debe ser un string' })
  descripcionDescuento: string;

  @ApiProperty({
    title: 'Porcentaje Descuento',
    name: 'porcentajeDescuento',
    description: 'Porcentaje del descuento',
    required: true,
    nullable: false,
    example: 20,
  })
  porcentajeDescuento: number;

  @ApiProperty({
    title: 'Fecha de Inicio',
    name: 'fechaInicio',
    description: 'Fecha de inicio del descuento',
    required: true,
    nullable: false,
    example: '2024-12-20',
  })
  @Type(() => Date)
  @IsDate({
    message: 'La fecha de inicio del descuento debe ser una fecha',
  })
  fechaInicio: Date;

  @ApiProperty({
    title: 'Fecha de Fin',
    name: 'fechaFin',
    description: 'Fecha de fin del descuento',
    required: true,
    nullable: false,
    example: '2024-12-31',
  })
  @Type(() => Date)
  @IsDate({
    message: 'La fecha de fin del descuento debe ser una fecha',
  })
  fechaFin: Date;

  @ApiProperty({
    title: 'Estado Descuento',
    name: 'estado',
    description: 'Estado del descuento',
    enum: [0, 1],
    required: true,
    nullable: false,
    example: 1,
  })
  @IsEnum(EstadoDescuento, { message: 'El estado del descuento debe ser 0 para Inactivo o 1 para Activo' })
  estado: number;
}
