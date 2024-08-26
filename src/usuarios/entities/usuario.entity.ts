import { ApiProperty } from '@nestjs/swagger';

export class Usuario {  
      @ApiProperty()
      public rutUsuario: number;
      
      @ApiProperty()
      public contrasena: string;

      @ApiProperty()
      public nombre: string;

      @ApiProperty()
      public apePaterno: string;

      @ApiProperty()
      public apeMaterno: string;

      @ApiProperty()
      public correoElectronico: string;

      @ApiProperty()
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
