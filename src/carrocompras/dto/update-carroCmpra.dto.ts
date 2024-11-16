import { PartialType } from '@nestjs/swagger';
import { CreateCarroCompraDto } from './create-carroCmpra.dto';

export class UpdateCarrocompraDto extends PartialType(CreateCarroCompraDto) {}
