import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsRut } from 'src/commons/validator/is-rut.decorator';
import { UserRole } from '../roles.enum';

export class RegisterUsuarioDto {
  @ApiProperty({
    type: 'string',
    title: 'RUT del Usuario',
    description: 'Identificación única del Usuario en formato chileno de RUT',
    example: '16844040-5',
    minLength: 9, 
    maxLength: 10,
    pattern: '^\\d{7,8}-[\\dkK]$', 
    required: true, 
    nullable: false,
  }) 
  @IsRut({ message: 'El RUT ingresado no es válido.' })
  //@Validate (IsRutConstraint,{ message: 'El RUT ingresado no es válido.'})
  @IsNotEmpty({ message: 'El RUT no puede ser vacío' })
  @IsString({ message: 'El Rut del Usuario debe ser un string' })
  @Length(9, 10, {
    message: 'El Rut del Usuario debe tener entre 9 y 10 caracteres.',
  })
  public rutUsuario: string;

  @ApiProperty({
    type: 'string',
    title: 'Contraseña',
    example: 'password123',
    description: 'Contraseña del usuario',
    minLength: 8, 
    maxLength: 20, 
    format: 'password', 
    nullable: false, 
    required: true,
  }) 
  @IsNotEmpty({ message: 'La contraseña no puede ser vacío' })
  @IsString({ message: 'La contraseña debe ser un string' })
  @Length(8, 20, {
    message: 'La contraseña del usuario debe tener entre 8 y 20 caracteres.',
  })
  public contrasena: string;

  @ApiProperty({
    type: 'string',
    title: 'Nombres del Usuario',
    example: 'Ányelo Rodrigo',
    description: 'Nombres del usuario',
    minLength: 2, 
    maxLength: 50, 
    nullable: false,
    required: true,
  }) 
  @IsNotEmpty({ message: 'El campo nombres del usuario no puede ser vacío' })
  @IsString({ message: 'El camnpo nombres del usuario debe ser un string' })
  @Length(2, 50, {
    message: 'El camnpo nombres usuario debe tener entre 2 y 50 caracteres.',
  })
  public nombres: string;

  @ApiProperty({
    type: 'string',
    title: 'Apellidos del Usuario',
    example: 'Flores Contreras',
    description: 'Apellidos del usuario',
    minLength: 2, 
    maxLength: 50, 
    nullable: false, 
    required: true,
  }) 
  @IsString({ message: 'El campo apellidos del usuario debe ser un string' })
  @Length(2, 50, {
    message:
      'El campo apellidos del usuario debe tener entre 2 y 50 caracteres.',
  })
  public apellidos: string;

  @ApiProperty({
    type: 'string',
    title: 'Correo Electrónico',
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario',
    minLength: 5,
    maxLength: 100,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    nullable: false,
    required: true,
  })
  @IsNotEmpty({
    message: 'El correo electrónico del usuario no puede ser vacío',
  })
  @IsString({ message: 'El correo electrónico del usuario debe ser un string' })
  @Length(2, 50, {
    message:
      'El correo electrónico del usuario debe tener entre 5 y 100 caracteres.',
  })
  public correoElectronico: string;

  @ApiProperty({
    type: 'string',
    title: 'Teléfono',
    example: '+56912345678',
    description:
      'Número de teléfono del usuario, debe incluir el código de país',
    minLength: 12, 
    maxLength: 12, 
    pattern: '^\\+56\\d{9}$', 
    nullable: false, 
    required: true,
  })
  @IsNotEmpty({ message: 'El teléfono del usuario no puede ser vacío' }) 
  @IsString({ message: 'El teléfono del usuario debe ser un string' })
  @Length(2, 50, {
    message: 'El teléfono del usuario debe tener entre 5 y 100 caracteres.',
  })
  public telefono: string;

  @ApiProperty({
    type: 'boolean',
    title: 'Check de Ofertas al crear el Usuario',
    description: 'Check de Ofertas al crear el Usuario.',
    example: 'true',
    nullable: true,
    required: true,
  })
  @IsNotEmpty({ message: 'El check de ofertas no puede ser vacío' })
  public chkOfertas: boolean;

  // @ApiProperty({
  //   type: 'boolean',
  //   title: 'Check de Terminos al crear el Usuario',
  //   description: 'Check de Terminos al crear el Usuario.',
  //   example: 'true',
  //   nullable: true,
  //   required: true,
  // })
  // @IsNotEmpty({ message: 'El check de Terminos no puede ser vacío' })
  // public chkTerminos: boolean;


}
