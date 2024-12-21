import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { UserRole } from '../roles.enum';
import { IsString } from 'class-validator';
import { CreateClienteDto } from './create-usuario.dto';
import { RegisterClienteDto } from './create-cliente.dto';

export class ReadClienteDto extends PartialType(
  OmitType(RegisterClienteDto, ['contrasena']),
) {
  @ApiProperty({
    type: 'number',
    title: 'Id del Usuario',
    description: 'Identificación única del Usuario en formato chileno',
  })
  public idUsuario: number;

  @ApiProperty({
    type: 'boolean',
    title: 'Check de Ofertas al crear el Usuario',
    description: 'Check de Ofertas al crear el Usuario.',
  })
  public chkTerminos: boolean;

  @ApiProperty({
    type: 'boolean',
    title: 'Check de Ofertas al crear el Usuario',
    description: 'Check de Ofertas al crear el Usuario.',
  })
  public activo: boolean;
}
