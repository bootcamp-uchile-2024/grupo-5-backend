import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCarroCompraDto {
  @ApiProperty({
    title: 'Id del Usuario',
    name: 'idUsuario',
    description: 'Id del Usuario',
    nullable: false,
    minimum: 1,
  })
  @IsInt( { message: 'El idUsuario debe ser un número entero' } )
  @IsNotEmpty({ message: 'El idUsuario es requerido' })
  idUsuario: number;
}
