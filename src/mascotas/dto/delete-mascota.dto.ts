import { IsNotEmpty, IsNumber  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EliminaMascotaDto {
  @ApiProperty({
    description: 'RUT del usuario dueño de la Mascota',
    example: '12345678-9',
  })
  @IsNotEmpty({ message: 'El RUT no puede estar vacío' })
  rut: string;

  @ApiProperty({
    description: 'Id  de la Mascota',
    example: 23,
  })
  @IsNotEmpty({ message: 'El Id de la Mascota no puede estar vacío' })
  @IsNumber({}, { message: 'El Id de la Mascota debe ser un número' })
  IdMascota: number;

}