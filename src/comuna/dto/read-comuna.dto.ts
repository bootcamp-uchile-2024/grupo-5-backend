import { ApiProperty } from "@nestjs/swagger";

export class CreateComunaDto {
    @ApiProperty({
        name: 'idComuna', 
        description: 'Identificador de la comuna'})
    idComuna: number;

    @ApiProperty({
        name: 'idregion',
        description: 'Identificador de la región'})
    idRegion: number;

    @ApiProperty({
        name: 'nombreComuna',
        description: 'Nombre de la comuna'})
    nombreComuna: string;
    
}
