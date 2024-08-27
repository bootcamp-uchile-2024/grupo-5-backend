import { ApiProperty } from '@nestjs/swagger';

export class CreateMascotaDto {

     // @ApiProperty()
     // public idMascota: number;

      @ApiProperty({type: 'string', title: 'Rut de Usuario',description: 'Identificación del Usuario',required: true,example: '10234945-K'})
      public rutUsuario: string;

      @ApiProperty({type: 'string', title: 'Nombre Mascota',description: 'Nombre de la Mascota',required: true,example: 'Snoopy'})
      public nombre: string;

      @ApiProperty({type: 'number', title: 'Edad de la Mascota',description: 'Edad en años de la Mascota',required: true,example: 3})
      public edad: number;

      @ApiProperty({type: 'string', title: 'Raza de la Mascota',description: 'Raza de la Mascota',required: true,example: 'Beagle'})
      public raza: string;

      @ApiProperty({type: 'string', title: 'Imagen de la Mascota',description: 'Ruta del archivo imagen',required: false,example: './images/Snoopy.jpg'})
      public imagen?: string;

      @ApiProperty({type: 'string[]', title: 'Afeccciones de la Mascota',description: 'Listado de afeccciones de la Mascota',required: false,example: ['Rabia','Tiña']})
      public afeccionesSalud?: string[];

      @ApiProperty({type: 'string[]', title: 'Preferencias de la Mascota',description: 'Listado de preferencias de la Mascota',required: false,example: ['ProPlan','RoyalCanin']})
      public preferencias?: string[];
      
      //@ApiProperty()
     // public historialClinico: HistorialClinico[];
  }