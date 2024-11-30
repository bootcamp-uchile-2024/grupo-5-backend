import { PartialType } from '@nestjs/swagger';
import { CreateCarroCompraDto } from './create-carro-compra.dto';


export class UpdateCarrocompraDto extends PartialType(CreateCarroCompraDto) {}
