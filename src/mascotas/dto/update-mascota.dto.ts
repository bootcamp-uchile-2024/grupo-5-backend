import { PartialType } from '@nestjs/mapped-types';
import { CreateMascotaDto } from './create-mascota.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class ActualizarMascotaDto extends PartialType(CreateMascotaDto) {
    @ApiProperty({
        type: 'string', 
        title: 'Rut de Usuario',
        description: 'Identificación única del dueño de la mascota en formato chileno de RUT',
        required: true,
        nullable: false,
        minLength: 9,
        maxLength: 10,
        pattern: '^\\d{7,8}-[\\dkK]$',
        example: '10234945-K'})
        @IsString({message: 'El Rut del Usuario debe ser un string'})
        @Length(9, 10, { message: 'El Rut del Producto debe tener entre 9 y 10 caracteres. (Incluyendo - y DV)' })            

public rutUsuario: string;

@ApiProperty({
        type: 'number', 
        title: 'Id Mascota',
        description: 'Identificación unica de la Mascota',
        minLength: 2,
        maxLength: 6,
        required: true,
        nullable: false,
        example: 23535})
        @IsNumber({}, {message: 'El Identificador de la Mascota debe ser un número'})
        @IsNotEmpty({message: 'El Identificador de la Mascota no puede estar vacío'})
        @Min(1, { message: 'El Identificador de la Mascota debe ser al menos 1.' })
        @Max(999999, { message: 'El Identificador de la Mascota no debe exceder los 999999.' })
public idMascota: number;

@ApiProperty({
        type: 'string',
        title: 'Nombre Mascota',
        description: 'Nombre de la Mascota',
        required: true,
        nullable: false,
        minLength: 2,
        maxLength: 50,  
        example: 'Snoopy'})
        @IsString({message: 'El Nombre de la Mascota debe ser un string'})
        @Length(2, 50, { message: 'El Nombre de la Mascota debe tener entre 2 y 50 caracteres.' })
        @IsNotEmpty({message: 'El Nombre de la Mascota no puede estar vacía'})
public nombre: string;

@ApiProperty({type: 'string',
title: 'Categoría Mascota',
description: 'Categóría de la Mascota',
required: true,
nullable: false,
minLength: 2,
maxLength: 50, 
example: 'Perro'})
@IsString({message: 'La Categoría de la Mascota debe ser un string'})
@IsNotEmpty({message: 'La Categoría de la Mascota no puede estar vacía'})
@Length(2, 50, { message: 'La Categoría de la Mascota debe tener entre 2 y 50 caracteres.' })
public categoria: string;

@ApiProperty({
       type: 'string', 
       title: 'Raza de la Mascota',
       description: 'Raza de la Mascota',
       required: true,
       nullable: false,
       minLength: 2,
       maxLength: 50, 
       example: 'Beagle'})
       @IsString({message: 'La Raza de la Mascota debe ser un string'})
       @IsNotEmpty({message: 'La Raza de la Mascota no puede estar vacía'})
       @Length(2, 50, { message: 'La Raza de la Mascota debe tener entre 2 y 50 caracteres.' })
public raza: string;

@ApiProperty({
        type: 'number',
        title: 'Edad de la Mascota',
        description: 'Edad en años de la Mascota',
        required: true,
        minLength: 1,
        maxLength: 3, 
        example: 3})
        @IsNumber({}, {message: 'La Edad de la Mascota debe ser un número'})
        @IsNotEmpty({message: 'La Edad de la Mascota no puede estar vacío'})
        @Min(1, { message: 'La Edad de la Mascota debe ser al menos 1.' })
        @Max(999, { message: 'La Edad de la Mascota no debe exceder los 999 años.' })
public edad: number;


@ApiProperty({
        type: 'string', 
        title: 'Imagen de la Mascota',
        description: 'Ruta del archivo imagen',
        required: false,
        maxLength: 255,
        example: './images/Snoopy.jpg'})
        @IsString({message: 'La Ruta de la Imagen de la Mascota debe ser un string'})
        @Length(0, 255, { message: 'La Ruta de la Imagen de la Mascota no debe ser superior a los 255 caracteres.' })
public imagen?: string;

@ApiProperty(
       {type: 'string[]', 
       title: 'Afeccciones de la Mascota',
       description: 'Listado de afeccciones de la Mascota',
       required: false,
       maxLength: 30,
       example: ['Rabia','Tiña']})
       @IsArray({message: 'El Listado de afeccciones de la Mascota deben ser un arreglo de strings'})
       @IsString({ each: true, message: 'Cada una de las afecciones debe ser una cadena de texto.' })
public afeccionesSalud?: string[];

@ApiProperty({type: 'string[]', 
        title: 'Preferencias de la Mascota',
        description: 'Listado de preferencias de la Mascota',
        required: false,
        maxLength: 50,
        example: ['ProPlan','RoyalCanin']})
        @IsArray({message: 'El Listado de Preferencias de la Mascota deben ser un arreglo de strings'})
        @IsString({ each: true, message: 'Cada una de las preferencia de la Mascota debe ser una cadena de texto.' })
public preferencias?: string[];

//@ApiProperty()
// public historialClinico: HistorialClinico[];

}
