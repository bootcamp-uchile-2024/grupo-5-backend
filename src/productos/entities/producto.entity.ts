import { ApiProperty } from '@nestjs/swagger';

export class Producto {  

      @ApiProperty() 
      public id: number;

      @ApiProperty() 
      public nombre: string;

      @ApiProperty() 
      public descripcion: string;

      @ApiProperty() 
      public precio: number;

      @ApiProperty() 
      public etiquetas: string[];

      @ApiProperty() 
      public stock: number;
  }