import { PartialType } from '@nestjs/swagger';
import { CreateConexionDto } from './create-conexion.dto';

export class UpdateConexionDto extends PartialType(CreateConexionDto) {}
