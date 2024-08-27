import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {  

          @ApiProperty({type: 'number', title: 'Rut del Usuario',description: 'Identificación del Usuario',required: true,example: '10234945-K'})
          public rutUsuario: number;
     
          @ApiProperty({type: 'string', title: 'Contraseña del Usuario',description: 'Contraseña del Usuario',required: true,example: 'Snn00py'})
          public contrasena: string;
    
          @ApiProperty({type: 'string', title: 'Nombre del Usuario',description: 'Nombre del Usuario',required: true,example: 'Mamerto'})
          public nombre: string;
                  
          @ApiProperty({type: 'string', title: 'Apellido Paterno del Usuario',description: 'Apellido Paterno del Usuario',required: true,example: 'Soto'})
          public apePaterno: string;
          
          @ApiProperty({type: 'string', title: 'Apellido Materno del Usuario',description: 'Apellido Materno del Usuario',required: true,example: 'Perez'})
          public apeMaterno: string;
          
          @ApiProperty({type: 'string', title: 'Correo Electrónico del Usuario', description: 'Dirección de Correo Electrónico del usuario', required: true, example: 'mamerto.soto@mail.cl'})
          public correoElectronico: string;
          
          @ApiProperty({type: 'string', title: 'Teléfono del Usuario', description: 'Número telefónico del usuario', required: true, example: '56944556699'})
          public telefono: string;
    
          //@ApiProperty()
          //public preferencias: Preferencia[];
    
          //@ApiProperty()
          //public historialCompras: Compra[];
    
          //@ApiProperty()
          //public mascotas: Mascota[];
    
          //@ApiProperty()
          //public notificaciones: Notificacion[];
      }
    
