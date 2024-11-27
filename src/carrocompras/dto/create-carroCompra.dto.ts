import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { DetalleCarroCompra } from "../entities/detalleCarroCompra.entity";

export class CreateCarroCompraDto {
    
    @ApiProperty({
        type: 'number',
        title: 'Identificador del carro de Compras',
        description: 'Identificador del carro de Compras',
        minimum: 1,
        maximum: 1000000000,
        nullable: false,
        example: 1,
      })
      @IsNumber()
      @Min(1, { message: 'Identificador del carro de Compras debe ser al menos 1' })
      @Max(1000000000, { message: 'Identificador del carro de Compras debe ser como máximo 1000000000' })
      @IsNotEmpty({ message: 'Identificador del carro de Compras no puede ser vacío' })
      idCarroCompras: number;
      
      @ApiProperty({
        type: 'number',
        title: 'Id del Usuario',
        description: 'Identificación única del Usuario en el sistema',
        example: 1,
        minimum: 1,
        maximum: 10000000000,
        required: true,
        nullable: false,
      })
      @IsNumber()
      @Min(1, { message: 'El id del Usuario debe ser al menos 1' })
      @Max(10000000000, { message: 'El id del Usuario debe ser como máximo 10000000000' })
      @IsNotEmpty({ message: 'El id del Usuario no puede ser vacío' })
      idUsuario: number;
  
      @ApiProperty({
        type: 'Date',
        title: 'Fecha Creacion del carro de Compras',
        description: 'Fecha Creacion del carro de Compras',
        nullable: false,
        example: '2024-10-10',
      })
      @IsDateString()
      @IsNotEmpty({ message: 'Fecha Creacion del carro de Compras no puede ser vacía' })
      fechaCreacion: Date;
  

      @ApiProperty({
        type: 'number',
        title: 'Precio Total del los productos en el carro de Compras',
        description: 'Precio Total del los productos en el carro de Compras',
        minimum: 1,
        maximum: 1000000000,
        nullable: false,
        example: 1,
      })
      @IsNumber()
      @Min(1, { message: 'Precio Total del los productos en el carro de Compras debe ser al menos 1' })
      @Max(1000000000, { message: 'Precio Total del los productos en el carro de Compras debe ser como máximo 1000000000' })
      @IsNotEmpty({ message: 'Precio Total del los productos en el carro de Compras no puede ser vacío' })
      precioTotal: number;

  
    @ApiProperty({
        description: 'Lista de detalles del carro de compras',
        type: [DetalleCarroCompra],
      })
      @IsArray()
      detallesCarro: DetalleCarroCompra[];
  
  }