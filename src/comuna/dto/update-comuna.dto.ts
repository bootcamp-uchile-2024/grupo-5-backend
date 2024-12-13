import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateComunaDto } from './create-comuna.dto';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateComunaDto {

    @ApiProperty({
        name: 'idregion',
        description: 'Identificador de la región',
        example: 13})
    @IsInt({
        message: 'El idregion debe ser un entero'})
    idRegion: number;

    @ApiProperty({
        name: 'nombrecomuna',
        description: 'Nombre de la comuna',
        example: 'Santiago'})
    @IsString({
        message: 'El nombre comuna debe ser una cadena de texto'})
    nombreComuna: string;
    
}

