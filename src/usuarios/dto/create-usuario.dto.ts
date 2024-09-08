import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/rol';

export class CreateUsuarioDto {  

    @ApiProperty({
        type: 'string',
        title: 'RUT del Usuario',
        description: 'Identificación única del usuario',
        example: '10234945-K',
        minLength: 9,                   // Tamaño minimo
        maxLength: 10,                  // Tamaño maximo
        pattern: "^\\d{7,8}-[\\dkK]$",  // Valida el formato del RUT chileno
        required: true,                 // Indica si es obligatorio
        nullable: false,                // Indica si el valor puede ser nulo
        readOnly: false,                // Indica si el valor es de solo lectura
        writeOnly: true,                // Indica si el valor es de solo escritura
        deprecated: false,              // Indica si la propiedad está obsoleta
      })
      public rutUsuario: string;
      
      // @ApiProperty({
        // type: 'string',
        // title: 'Contraseña',
        // example: 'password123',
        // description: 'Contraseña del usuario',
        // minLength: 8,                   // Tamaño minimo
        // maxLength: 20,                  // Tamaño maximo
        // format: 'password',             // Especifica que es un campo de contraseña
        // nullable: false,                // Indica si el valor puede ser nulo
        // required: true,                 // Indica si es obligatorio
        // readOnly: false,                // Indica si el valor es de solo lectura
        // writeOnly: true,                // Indica si el valor es de solo escritura
        // deprecated: false,              // Indica si la propiedad está obsoleta
      // })
      // public contrasena: string;
    
      @ApiProperty({
        type: 'string',
        title: 'Nombre del Usuario',
        example: 'Mamerto',
        description: 'Nombre de pila del usuario',
        minLength: 2,                   // Tamaño minimo
        maxLength: 50,                  // Tamaño maximo              
        nullable: false,                // Indica si el valor puede ser nulo    
        required: true,                 // Indica si es obligatorio  
        readOnly: false,                // Indica si el valor es de solo lectura     
        writeOnly: true,                // Indica si el valor es de solo escritura    
        deprecated: false,              // Indica si la propiedad está obsoleta  
      })
      public nombre: string;
                  
      @ApiProperty({
        type: 'string',
        title: 'Apellido Paterno',
        example: 'Pérez',
        description: 'Apellido Paterno del usuario (1er apellido)',
        minLength: 2,                   // Tamaño minimo
        maxLength: 50,                  // Tamaño maximo        
        nullable: false,                // Indica si el valor puede ser nulo    
        required: true,                 // Indica si es obligatorio  
        readOnly: false,                // Indica si el valor es de solo lectura     
        writeOnly: true,                // Indica si el valor es de solo escritura    
        deprecated: false,              // Indica si la propiedad está obsoleta         
      })
      public apePaterno: string;
          
      @ApiProperty({
        type: 'string',
        title: 'Apellido Materno',
        example: 'González',
        description: 'Apellido Paterno del usuario (2do apellido)',
        minLength: 2,                   // Tamaño minimo
        maxLength: 50,                  // Tamaño maximo        
        nullable: false,                // Indica si el valor puede ser nulo    
        required: true,                 // Indica si es obligatorio  
        readOnly: false,                // Indica si el valor es de solo lectura     
        writeOnly: true,                // Indica si el valor es de solo escritura    
        deprecated: false,              // Indica si la propiedad está obsoleta
      })
      public apeMaterno: string;
          
      @ApiProperty({
        type: 'string',
        title: 'Correo Electrónico',
        example: 'juan.perez@example.com',
        description: 'Correo electrónico del usuario',
        minLength: 20,                                                  // Tamaño minimo
        maxLength: 50,                                                  // Tamaño maximo
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",     // Valida el formato del mailbox
        nullable: false,                                                // Indica si el valor puede ser nulo    
        required: true,                                                 // Indica si es obligatorio  
        readOnly: false,                                                // Indica si el valor es de solo lectura     
        writeOnly: true,                                                // Indica si el valor es de solo escritura    
        deprecated: false,                                              // Indica si la propiedad está obsoleta
      })
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
        required: true,                                                 // Indica si es obligatorio  
        readOnly: false,                                                // Indica si el valor es de solo lectura     
        writeOnly: true,                                                // Indica si el valor es de solo escritura    
        deprecated: false,                                              // Indica si la propiedad está obsoleta
      })
      public telefono: string;

      @ApiProperty({
        type: 'string',
        title: 'Rol del Usuario',
        description: 'Rol del usuario en el sistema',
        example: 'Cliente',
        enum: UserRole,                 // Especifica que es un campo de un conjunto de valores

      })
      public rolUsuario: string;


    

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
       //     readOnly: false,                    // Indica si el valor es de solo lectura     
       //     writeOnly: true,                    // Indica si el valor es de solo escritura    
       //     deprecated: false,                  // Indica si la propiedad está obsoleta
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
       //     readOnly: false,                    // Indica si el valor es de solo lectura     
       //     writeOnly: true,                    // Indica si el valor es de solo escritura    
       //     deprecated: false,                  // Indica si la propiedad está obsoleta
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
       //     readOnly: false,                    // Indica si el valor es de solo lectura     
       //     writeOnly: true,                    // Indica si el valor es de solo escritura    
       //     deprecated: false,                  // Indica si la propiedad está obsoleta
       //   })
       //   public notificaciones: string[];
      }
    
