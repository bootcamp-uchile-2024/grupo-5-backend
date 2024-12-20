import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDireccionDto } from "./create-direccion.dto";
import { Exclude } from "class-transformer";
import { Comuna } from "src/comuna/entities/comuna.entity";
import { IsInt, IsNotEmpty } from "class-validator";

export class ReadDireccionDto extends PartialType(CreateDireccionDto) {
    @Exclude()
    idComuna: number;

    @ApiProperty({ 
        name: 'idDirección', 
        description: 'Identificador de la dirección'})
    idDireccion: number;

    @ApiProperty({ 
        name: 'activo', 
        description: 'Indica si la dirección está activa o no'})
    activo: boolean;


      @ApiProperty({
        name: 'Comuna',
        description: 'Nombre de la comuna',
        type: 'number',
        nullable: false,
        example: 5109,
      })
      @IsInt({ message: 'El Id Comuna debe ser un entero' })
      @IsNotEmpty({ message: 'Debe ingresar un Id Comuna' })
      comuna: Comuna;
}