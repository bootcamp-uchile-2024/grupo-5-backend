import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EliminaUsuarioDto {
  @ApiProperty({
    description: 'RUT del usuario a eliminar',
    example: '12345678-9',
  })
  @IsNotEmpty({ message: 'El RUT no puede estar vacío' })
  rut: string;
}