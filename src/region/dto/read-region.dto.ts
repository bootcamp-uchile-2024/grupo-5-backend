import { ApiProperty } from "@nestjs/swagger";

export class ReadRegionDto {
    @ApiProperty({
        name: 'idRegion', 
        description: 'Identificador de la región',
        example: 1})
    idRegion: number;

    @ApiProperty({
        name: 'orden',
        description: 'Orden de la región',
        example: 1})
    orden: number;
    
    @ApiProperty({
        name: 'nombreRegion',
        description: 'Nombre de la región',
        example: 'Región Metropolitana'})
    nombreRegion: string;
    }
