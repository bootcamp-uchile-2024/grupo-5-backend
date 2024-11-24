import { PartialType } from '@nestjs/swagger';
import { CreateCarroCompraDto } from './create-carroCompra.dto';


export class UpdateCarrocompraDto extends PartialType(CreateCarroCompraDto) {}
