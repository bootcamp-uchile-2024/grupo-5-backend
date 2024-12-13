import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { DetalleCarroCompra } from 'src/detalle-carro-compras/entities/detalle-carro-compra.entity';

export class CreateCarroCompraDto {
  @ApiProperty({
    title: 'Id del Usuario',
    name: 'idUsuario',
    description: 'Id del Usuario',
    nullable: false,
    minimum: 1,
  })
  idUsuario: number;

  @ApiProperty({
    type: 'Date',
    title: 'Fecha Creacion del carro de Compras',
    description: 'Fecha Creacion del carro de Compras',
    nullable: false,
    default: new Date()
  })
  @IsDateString()
  @IsNotEmpty({
    message: 'Fecha Creacion del carro de Compras no puede ser vacía',
  })
  fechaCreacion: Date;

}
