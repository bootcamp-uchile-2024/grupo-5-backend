import { PartialType } from '@nestjs/swagger';
import { CreateCarrocompraDto } from './create-carrocompra.dto';

export class UpdateCarrocompraDto extends PartialType(CreateCarrocompraDto) {}
