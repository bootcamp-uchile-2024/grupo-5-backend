import { PartialType } from '@nestjs/swagger';
import { CreateDireccioneDto } from './create-direccione.dto';

export class UpdateDireccioneDto extends PartialType(CreateDireccioneDto) {}
