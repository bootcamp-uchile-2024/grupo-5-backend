import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserRole } from '../roles.enum';
import { RegisterInvitadoDto } from './create-invitado.dto';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';

export class ReadInvitadoDto extends PartialType(RegisterInvitadoDto) {
  @ApiProperty({
    name: 'idUsuario',
    description: 'Identificador del usuario invitado',
  })
  idUsuario: number;

  @ApiProperty({
    name: 'CarroCompra',
    description: 'Carro de compra del usuario invitado',
  })
  carroCompra: CarroCompra;
}
