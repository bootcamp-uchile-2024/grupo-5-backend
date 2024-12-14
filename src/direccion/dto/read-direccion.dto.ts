import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDireccionDto } from "./create-direccion.dto";

export class ReadDireccionDto extends PartialType(CreateDireccionDto) {
    @ApiProperty({ 
        name: 'idDirección', 
        description: 'Identificador de la dirección'})
    idDireccion: number;

    @ApiProperty({ 
        name: 'activo', 
        description: 'Indica si la dirección está activa o no'})
    activo: boolean;
}