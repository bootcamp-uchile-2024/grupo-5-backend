import { ApiProperty } from '@nestjs/swagger';

export class Mascota {

      @ApiProperty()
      public idMascota: number;

      @ApiProperty()
      public rutUsuario: number;

      @ApiProperty()
      public nombre: string;

      @ApiProperty()
      public edad: number;

      @ApiProperty()
      public raza: string;

      @ApiProperty()
      public imagen: string;

      @ApiProperty()
      public afeccionesSalud: string[];

      @ApiProperty()
      public preferencias: string[];
      
      //@ApiProperty()
     // public historialClinico: HistorialClinico[];
  }