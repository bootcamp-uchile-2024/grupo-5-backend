import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateClienteDto } from './create-usuario.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @ApiProperty({
    type: 'string',
    title: 'RUT del Usuario',
    description: 'Identificación única del Usuario en formato chileno de RUT',
    example: '10234945-K',
    minLength: 9,
    maxLength: 10, 
    pattern: '^\\d{7,8}-[\\dkK]$', 
    required: true, 
    nullable: false,
  }) 
  @IsString({ message: 'El Rut del Usuario debe ser un string' })
  @Length(9, 10, {
    message: 'El Rut del Usuario debe tener entre 9 y 10 caracteres.',
  })
  public rutUsuario: string;

  @ApiProperty({
    type: 'string',
    title: 'Nombre del Usuario',
    example: 'Paola',
    description: 'Nombre de pila del usuario',
    minLength: 2, 
    maxLength: 50, 
    nullable: false, 
    required: true,
  }) 
  @IsString({ message: 'El Nombre del Usuario debe ser un string' })
  @Length(2, 50, {
    message: 'El Nombre del Usuario debe tener entre 2 y 50 caracteres.',
  })
  public nombre: string;

  @ApiProperty({
    type: 'string',
    title: 'Apellido Paterno',
    example: 'Novoa',
    description: 'Apellido Paterno del usuario (1er apellido)',
    minLength: 2, 
    maxLength: 50, 
    nullable: false, 
    required: true,
  }) 
  @IsString({ message: 'El Apellido Paterno del Usuario debe ser un string' })
  @Length(2, 50, {
    message:
      'El Apellido Paterno del Usuario debe tener entre 2 y 50 caracteres.',
  })
  public apePaterno: string;

  @ApiProperty({
    type: 'string',
    title: 'Apellido Materno',
    example: 'Abarca',
    description: 'Apellido Materno del usuario (2do apellido)',
    minLength: 2, 
    maxLength: 50, 
    nullable: false, 
    required: true,
  }) 
  @IsString({ message: 'El Apellido Materno del Usuario debe ser un string' })
  @Length(2, 50, {
    message:
      'El Apellido Materno del Usuario debe tener entre 2 y 50 caracteres.',
  })
  public apeMaterno: string;

  @ApiProperty({
    type: 'string',
    title: 'Correo Electrónico',
    example: 'ojito74@hotmail.com',
    description: 'Correo electrónico del usuario',
    minLength: 5,
    maxLength: 100,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', 
    nullable: false, 
    required: true,
  }) 
  @IsString({ message: 'El Correo Electrónico del Usuario debe ser un string' })
  @Length(2, 50, {
    message:
      'El Correo Electrónico del Usuario debe tener entre 5 y 100 caracteres.',
  })
  public correoElectronico: string;

  @ApiProperty({
    type: 'string',
    title: 'Teléfono',
    example: '56912345678',
    description:
      'Número de teléfono del usuario, debe incluir el código de país',
    minLength: 9, 
    maxLength: 11, 
    nullable: false, 
    required: true,
  }) 
  @IsNotEmpty({ message: 'El teléfono del usuario no puede ser vacío' }) 
  @IsString({ message: 'El teléfono del usuario debe ser un string' })
  @Length(9, 11, {
    message: 'El teléfono del usuario debe tener entre 9 y 11 caracteres.',
  })
  public telefono: string;

  @ApiProperty({
    type: 'number',
    title: 'Rol del Usuario',
    description:
      'Rol del usuario en el sistema. Debe ser uno de los siguientes valores: ADMINISTRADOR, MANAGER, CLIENTE, INVITADO.',
    example: '1',
    nullable: false, 
    required: true,
  }) 
  public rolUsuario: number;
}
