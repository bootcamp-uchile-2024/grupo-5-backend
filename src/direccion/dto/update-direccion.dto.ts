import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDireccionDto {  
      @ApiProperty({
        name: 'idComuna',
        description: 'Identificador de la comuna',
        type: 'number',
        nullable: false,
        example: 13203,
      })
      @IsInt({ message: 'El Id Comuna debe ser un entero' })
      @IsNotEmpty({ message: 'Debe ingresar un Id Comuna' })
      idComuna: number;
    
      @ApiProperty({
        name: 'alias',
        description: 'Alias de la dirección',
        type: 'string',
        example: 'Casa Playa',
      })
      @IsString({ message: 'El alias debe ser una cadena de texto' })
      @IsNotEmpty({ message: 'Debe ingresar un Alias' })
      alias: string;
    
      @ApiProperty({
        name: 'calle',
        description: 'Nombre de la calle',
        type: 'string',
        example: 'Los Pinos',
      })
      calle: string;
    
      @ApiProperty({
        name: 'numero',
        description: 'Número de la dirección',
        type: 'string',
        nullable: true,
        example: '123',
      })
      @IsString({ message: 'El número de la dirección debe ser una cadena de texto' })
        @IsNotEmpty({ message: 'Debe ingresar un número de dirección' })
      numero: string;
    
      @ApiProperty({
        name: 'referencias',
        description: 'Número de departamento',
        type: 'string',
        nullable: true,
        example: '1309A',
      })
      @IsString({ message: 'Las referencias deben ser una cadena de texto' })
      referencias: string;
    
      @ApiProperty({
        name: 'personaContacto',
        description: 'Persona de contacto',
        type: 'string',
        nullable: false,
        example: 'Juan Perez',
      })
      @IsString({ message: 'La persona de contacto debe ser una cadena de texto' })
        @IsNotEmpty({ message: 'Debe ingresar una persona de contacto' })
      personaContacto: string;
    
      @ApiProperty({
        name: 'telefonoContacto',
        description: 'Teléfono de contacto',
        type: 'number',
        nullable: false,
        example: 56912345678,
      })
      @IsInt({ message: 'El teléfono de contacto debe ser un entero' })
      @IsNotEmpty({ message: 'Debe ingresar un teléfono de contacto' })
      telefonoContacto: number;
    
}
