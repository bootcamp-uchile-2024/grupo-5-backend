import { ApiProperty } from "@nestjs/swagger";

export class CreateComunaDto {
    @ApiProperty({
        name: 'idcomuna', 
        description: 'Identificador de la comuna',
        example: 1101})
    idComuna: number;

    @ApiProperty({
        name: 'idregion',
        description: 'Identificador de la región',
        example: 1})
    idRegion: number;

    @ApiProperty({
        name: 'nombrecomuna',
        description: 'Nombre de la comuna',
        example: 'Santiago'})
    nombreComuna: string;
    
}
