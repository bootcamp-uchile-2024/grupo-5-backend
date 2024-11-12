import { PartialType } from '@nestjs/swagger';
import { CrearCarroCompraDto } from './create-carrocompra.dto';

export class UpdateCarroCompraDto extends PartialType(CrearCarroCompraDto) {}
