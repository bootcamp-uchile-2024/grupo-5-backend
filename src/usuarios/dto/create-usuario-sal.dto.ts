
      import { ApiProperty } from '@nestjs/swagger';

      export class CreateUsuarioDtoSal {  
      
        @ApiProperty({
            type: 'string',
            title: 'Rut del Usuario',
            description: 'Identificación única del usuario en formato chileno de RUT',
            example: '10234945-K',
          })
          public rutUsuario: string;

          @ApiProperty({
            type: 'string',
            title: 'Contraseña',
            description: 'Contraseña del usuario, debe tener al menos 8 caracteres y 20 caracteres maximo',
            example: 'password123',
          })
          public contrasena: string;
      
          @ApiProperty({
            type: 'string',
            title: 'Nombre del Usuario',
            description: 'Nombre de pila del usuario',
            example: 'Mamerto',        
          })
          public nombre: string;

         @ApiProperty({
            type: 'string',
            title: 'Apellido Paterno',
            description: 'Primer apellido del usuario',
            example: 'Pérez',           
        })
        public apePaterno: string;
      
        @ApiProperty({
            type: 'string',
            title: 'Apellido Materno',
            description: 'Segundo apellido del usuario',
            example: 'González',           
          })
          public apeMaterno: string;
      
          @ApiProperty({
            type: 'string',
            title: 'Correo Electrónico',
            description: 'Correo electrónico del usuario',
            example: 'juan.perez@example.com',          
          })
          public correoElectronico: string;
      
          @ApiProperty({
            type: 'string',
            title: 'Teléfono',
            description: 'Número de teléfono del usuario, debe incluir el código de país',
            example: '+56912345678',          
          })
          public telefono: string;
      
        //  @ApiProperty({
        //    type: 'array',
        //    title: 'Preferencias del Usuario',
        //    description: 'Lista de preferencias del usuario',
        //    items: { type: 'string' },
        //    example: ['Gatos', 'Perros'],
        //  })
        //  public preferencias: string[];
      //
        //  @ApiProperty({
        //    type: 'array',
        //    title: 'Historial de Compras',
        //    description: 'Historial de compras del usuario',
        //    items: { type: 'string' },
        //    example: ['compra1', 'compra2'],
        //  })
        //  public historialCompras: string[];
      //
        // @ApiProperty({
        //   type: Mascota[],
        //   title: 'Mascotas',
        //   description: 'Lista de mascotas del usuario',
        //   example: [
        //            { id: 1, nombre: 'Firulais', tipo: 'Perro' },
        //             { id: 2, nombre: 'Misu', tipo: 'Gato' }
        //   ],
        // })
        // public mascotas: Mascota[];
      //
        //@ApiProperty({
        //    type: 'Notificacion[]',
        //    title: 'Notificaciones',
        //    description: 'Lista de notificaciones del usuario',
        //    items: { type: 'Notificacion' },
        //    example: [
        //         { id: 1, mensaje: 'Notificación 1', leida: false },
        //         { id: 2, mensaje: 'Notificación 2', leida: true }
        //       ],
        //  })
        //  public notificaciones: string[];
  }//
   
