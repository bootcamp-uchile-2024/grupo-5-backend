import { ApiProperty } from "@nestjs/swagger";
import { ReadDetalleCarroCompraDto } from "./read-detalleCarroCompra.dto";

export class ReadCarroComprasDto {
    @ApiProperty({ description: 'Identificador único del carrito de compras' })
    idCarroCompras: number;
  
    @ApiProperty({ description: 'Fecha de creación del carrito' })
    fechaCreacion: Date;
  
    @ApiProperty({ description: 'Precio total del carrito de compras' })
    precioTotal: number;
  
    @ApiProperty({ description: 'Identificador del usuario que posee el carrito' })
    idUsuario: number;
  
    @ApiProperty({ description: 'Lista de detalles de los productos en el carrito', type: [ReadDetalleCarroCompraDto] })
    detallesCarro: ReadDetalleCarroCompraDto[];
  }