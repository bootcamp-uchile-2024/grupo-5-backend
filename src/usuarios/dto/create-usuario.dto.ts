import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/rol';
import { IsNotEmpty, IsString, Length, Matches, Validate } from 'class-validator';
import { IsRut } from 'src/commons/validator/is-rut.decorator';
import { IsRutConstraint } from 'src/commons/validator/is-rut.constraint';

export class CreateUsuarioDto {  

    @ApiProperty({
        type: 'string',
        title: 'RUT del Usuario',
        description: 'Identificación única del Usuario en formato chileno de RUT',
        example: '10234945-K',
        minLength: 9,                   // Tamaño minimo
        maxLength: 10,                  // Tamaño maximo
        pattern: "^\\d{7,8}-[\\dkK]$",  // Valida el formato del RUT chileno
        required: true,                 // Indica si es obligatorio
        nullable: false})                // Indica si el valor puede ser nulo
        @IsRut({ message: 'El RUT ingresado no es válido.' })
        //@Validate (IsRutConstraint,{ message: 'El RUT ingresado no es válido.'})
        @IsNotEmpty({ message: 'El RUT no puede ser vacío' })
        @IsString({message: 'El Rut del Usuario debe ser un string'})
        @Length(9, 10, { message: 'El Rut del Usuario debe tener entre 9 y 10 caracteres.' })
        
      public rutUsuario: string;
      
    @ApiProperty({
         type: 'string',
         title: 'Contraseña',
         example: 'password123',
         description: 'Contraseña del usuario',
         minLength: 8,                   // Tamaño minimo
         maxLength: 20,                  // Tamaño maximo
         format: 'password',             // Especifica que es un campo de contraseña
         nullable: false,                // Indica si el valor puede ser nulo
         required: true})                 // Indica si es obligatorio
         @IsNotEmpty({ message: 'La contraseña no puede ser vacío' })
         @IsString({message: 'La contraseña debe ser un string'})
         @Length(8, 20, { message: 'La contraseña del Usuario debe tener entre 8 y 20 caracteres.' })
     public contrasena: string;
    
      @ApiProperty({
        type: 'string',
        title: 'Nombre del Usuario',
        example: 'Paula',
        description: 'Nombre de pila del usuario',
        minLength: 2,                   // Tamaño minimo
        maxLength: 50,                  // Tamaño maximo              
        nullable: false,                // Indica si el valor puede ser nulo o no  
        required: true})                // Indica si es obligatorio  
        @IsNotEmpty({ message: 'El nombre no puede ser vacío' })
        @IsString({message: 'El Nombre del Usuario debe ser un string'})
        @Length(2, 50, { message: 'El Nombre del Usuario debe tener entre 2 y 50 caracteres.' })
      public nombre: string;
                  
      @ApiProperty({
        type: 'string',
        title: 'Apellido Paterno',
        example: 'Navia',
        description: 'Apellido Paterno del usuario (1er apellido)',
        minLength: 2,                   // Tamaño minimo
        maxLength: 50,                  // Tamaño maximo        
        nullable: false,                // Indica si el valor puede ser nulo    
        required: true})                 // Indica si es obligatorio  
        @IsString({message: 'El Apellido Paterno del Usuario debe ser un string'})
        @Length(2, 50, { message: 'El Apellido Paterno del Usuario debe tener entre 2 y 50 caracteres.' })    
      public apePaterno: string;
          
      @ApiProperty({
        type: 'string',
        title: 'Apellido Paterno',
        example: 'Abarza',
        description: 'Apellido Materno del usuario (2do apellido)',
        minLength: 2,                   // Tamaño minimo
        maxLength: 50,                  // Tamaño maximo        
        nullable: false,                // Indica si el valor puede ser nulo    
        required: true})                 // Indica si es obligatorio  
        @IsString({message: 'El Apellido Materno del Usuario debe ser un string'})
        @Length(2, 50, { message: 'El Apellido Materno del Usuario debe tener entre 2 y 50 caracteres.' })    
      public apeMaterno: string;
          
      @ApiProperty({
        type: 'string',
        title: 'Correo Electrónico',
        example: 'juan.perez@example.com',
        description: 'Correo electrónico del usuario',
        minLength: 5,  
        maxLength: 100,  
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",  // Escapado correctamente
        nullable: false,            // Manteniendo que no puede ser nulo
        required: true})             //  Indica si es obligatorio 
        @IsNotEmpty({ message: 'El Correo Electronico no puede ser vacío' }) 
        @IsString({message: 'El Correo Electrónico del Usuario debe ser un string'})
        @Length(2, 50, { message: 'El Correo Electrónico del Usuario debe tener entre 5 y 100 caracteres.' })    
    public correoElectronico: string;
    
          
      @ApiProperty({
        type: 'string',
        title: 'Teléfono',
        example: '+56912345678',
        description: 'Número de teléfono del usuario, debe incluir el código de país',
        minLength: 12,                                                  // Tamaño minimo
        maxLength: 12,                                                  // Tamaño maximo
        pattern: "^\\+56\\d{9}$",                                       // Valida el formato del teléfono chileno
        nullable: false,                                                // Indica si el valor puede ser nulo    
        required: true})
        @IsNotEmpty({ message: 'El Teléfono no puede ser vacío' })                                                // Indica si es obligatorio  
        @IsString({message: 'El Teléfono del Usuario debe ser un string'})
        @Length(2, 50, { message: 'El Teléfono del Usuario debe tener entre 5 y 100 caracteres.' })                                                    
      public telefono: string;

      @ApiProperty({
        type: 'string',
        title: 'Rol del Usuario',
        description: 'Rol del usuario en el sistema. Debe ser uno de los siguientes valores: ADMINISTRADOR, MANAGER, CLIENTE, INVITADO.',
        example: 'CLIENTE',
        enum: UserRole,          // Especifica que es un campo de un conjunto de valores
        enumName: 'UserRole',    // Nombre del enum para la documentación
        nullable: false,        // Asegura que el campo no sea nulo
        required: true})        // Campo obligatorio 
        @IsNotEmpty({ message: 'El Rol de Usuario no puede ser vacío' })
    public rolUsuario: UserRole;


    

       //  @ApiProperty({
       //     type: 'array',
       //     title: 'Preferencias del Usuario',
       //     description: 'Lista de preferencias del usuario',
       //     items: { type: 'string' },          // Especifica que es un array de strings
       //     example: ['Gatos', 'Perros'],
       //     nullable: true,                     // Indica si el valor puede ser nulo    
       //     required: false,                    // Indica si es obligatorio  
       //     readOnly: false,                    // Indica si el valor es de solo lectura     
       //     writeOnly: true,                    // Indica si el valor es de solo escritura    
       //     deprecated: false,                  // Indica si la propiedad está obsoleta
       //  })
       //  public preferencias: string[];
    
       //  @ApiProperty({
       //     type: 'array',
       //     title: 'Historial de Compras',
       //     description: 'Historial de compras del usuario',
       //     items: { type: 'string' }, // Debería ser un objeto o un ID de compra
       //     example: ['compra1', 'compra2'],
       //     nullable: true,                     // Indica si el valor puede ser nulo    
       //     required: false,                    // Indica si es obligatorio  
       //   })
       //   public historialCompras: string[];
    
       //   @ApiProperty({
       //     type: 'array',
       //     title: 'Mascotas',
       //     description: 'Lista de mascotas del usuario',
       //     items: { type: 'string' }, // Debería ser un objeto o un ID de mascota
       //     example: ['mascota1', 'mascota2'],
       //     nullable: true,                     // Indica si el valor puede ser nulo    
       //     required: false,                    // Indica si es obligatorio  
       //   })
       //   public mascotas: string[];
    
       //   @ApiProperty({
       //     type: 'array',
       //     title: 'Notificaciones',
       //     description: 'Lista de notificaciones del usuario',
       //     items: { type: 'string' }, // Debería ser un objeto o un ID de notificación
       //     example: ['notificacion1', 'notificacion2'],
       //     nullable: true,                     // Indica si el valor puede ser nulo    
       //     required: false,                    // Indica si es obligatorio  
       //   })
       //   public notificaciones: string[];
      }
    
