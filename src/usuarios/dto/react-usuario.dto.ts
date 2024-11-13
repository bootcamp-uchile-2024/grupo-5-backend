import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActivaUsuarioDto {
  @ApiProperty({
    description: 'RUT del usuario a activar',
    example: '12345678-9',
  })
  @IsNotEmpty({ message: 'El RUT no puede estar vacío' })
  rut: string;

  @ApiProperty({
    description: 'Campor que determina el estado del usuario en el sistema',
    example: 'true',
  })
  @IsNotEmpty({ message: 'El campo no puede estar vacío' })
  activo: boolean;
}