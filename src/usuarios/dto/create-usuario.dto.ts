import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsRut } from 'src/commons/validator/is-rut.decorator';
import { UserRole } from '../roles.enum';

export class CreateClienteDto {
  @ApiProperty({
    type: 'number',
    title: 'Id del Usuario',
    description: 'Identificación única del Usuario en formato chileno',
    example: '1',
    minLength: 1, // Tamaño minimo
    maxLength: 1000000, // Tamaño maximo
    required: true, // Indica si es obligatorio
    nullable: false,
  }) // Indica si el valor puede ser nulo
  @IsRut({ message: 'El Id ingresado no es válido.' })
  @IsNotEmpty({ message: 'El Id no puede ser vacío' })
  @IsString({ message: 'El Id del Usuario debe ser un numero' })
  @Length(1, 10, { message: 'El id del Usuario debe tener entre 1 y 1000000.' })
  public idUsuario?: number;

  @ApiProperty({
    type: 'string',
    title: 'RUT del Usuario',
    description: 'Identificación única del Usuario en formato chileno de RUT',
    example: '10234945-K',
    minLength: 9, // Tamaño minimo
    maxLength: 10, // Tamaño maximo
    pattern: '^\\d{7,8}-[\\dkK]$', // Valida el formato del RUT chileno
    required: true, // Indica si es obligatorio
    nullable: false,
  }) // Indica si el valor puede ser nulo
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
    minLength: 8, // Tamaño minimo
    maxLength: 20, // Tamaño maximo
    format: 'password', // Especifica que es un campo de contraseña
    nullable: false, // Indica si el valor puede ser nulo
    required: true,
  }) // Indica si es obligatorio
  @IsNotEmpty({ message: 'La contraseña no puede ser vacío' })
  @IsString({ message: 'La contraseña debe ser un string' })
  @Length(8, 20, {
    message: 'La contraseña del Usuario debe tener entre 8 y 20 caracteres.',
  })
  public contrasena: string;

  @ApiProperty({
    type: 'string',
    title: 'Nombre del Usuario',
    example: 'Paula',
    description: 'Nombre de pila del usuario',
    minLength: 2, // Tamaño minimo
    maxLength: 50, // Tamaño maximo
    nullable: false, // Indica si el valor puede ser nulo o no
    required: true,
  }) // Indica si es obligatorio
  @IsNotEmpty({ message: 'El nombre no puede ser vacío' })
  @IsString({ message: 'El Nombre del Usuario debe ser un string' })
  @Length(2, 50, {
    message: 'El Nombre del Usuario debe tener entre 2 y 50 caracteres.',
  })
  public nombre: string;

  @ApiProperty({
    type: 'string',
    title: 'Apellido Paterno',
    example: 'Navia',
    description: 'Apellido Paterno del usuario (1er apellido)',
    minLength: 2, // Tamaño minimo
    maxLength: 50, // Tamaño maximo
    nullable: false, // Indica si el valor puede ser nulo
    required: true,
  }) // Indica si es obligatorio
  @IsString({ message: 'El Apellido Paterno del Usuario debe ser un string' })
  @Length(2, 50, {
    message:
      'El Apellido Paterno del Usuario debe tener entre 2 y 50 caracteres.',
  })
  public apePaterno: string;

  @ApiProperty({
    type: 'string',
    title: 'Apellido Materno',
    example: 'Abarza',
    description: 'Apellido Materno del usuario (2do apellido)',
    minLength: 2, // Tamaño minimo
    maxLength: 50, // Tamaño maximo
    nullable: false, // Indica si el valor puede ser nulo
    required: true,
  }) // Indica si es obligatorio
  @IsString({ message: 'El Apellido Materno del Usuario debe ser un string' })
  @Length(2, 50, {
    message:
      'El Apellido Materno del Usuario debe tener entre 2 y 50 caracteres.',
  })
  public apeMaterno: string;

  @ApiProperty({
    type: 'string',
    title: 'Correo Electrónico',
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario',
    minLength: 5,
    maxLength: 100,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', // Escapado correctamente
    nullable: false, // Manteniendo que no puede ser nulo
    required: true,
  }) //  Indica si es obligatorio
  @IsNotEmpty({ message: 'El Correo Electronico no puede ser vacío' })
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
    example: '1', // Especifica que es un campo de un conjunto de valores    // Nombre del enum para la documentación
    nullable: false, // Asegura que el campo no sea nulo
    required: true,
  }) // Campo obligatorio
  @IsNotEmpty({ message: 'El Rol de Usuario no puede ser vacío' })
  public idRol: number;

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

  @ApiProperty({
    type: 'boolean',
    title: 'Check de Terminos al crear el Usuario',
    description: 'Check de Terminos al crear el Usuario.',
    example: 'true',
    nullable: true,
    required: true,
  })
  @IsNotEmpty({ message: 'El check de Terminos no puede ser vacío' })
  public chkTerminos: boolean;

  @ApiProperty({
    type: 'boolean',
    title: 'Check valida cuenta Usuario Activa',
    description: 'Check valida cuenta Usuario Activa.',
    example: 'true',
    nullable: false,
    required: true,
  })
  @IsNotEmpty({
    message: 'El check de validación de cuenta no puede ser vacío',
  })
  public activo: boolean;

  @ApiProperty({
    type: 'number',
    title: 'Identificador Id Avatar Usuario',
    example: '234',
    description: 'Identificador Id Avatar usuario registrado',
    nullable: true,
    required: false,
  })
  @IsString({ message: 'El Avatar del Usuario debe ser un number' })
  public idAvatar: number;
}
