import { ApiProperty } from "@nestjs/swagger";
import { Producto } from "src/productos/entities/producto.entity";

export class ReadDetalleCarroCompraDto {
    @ApiProperty({ description: 'Identificador único del detalle del carrito' })
    idDetalleCarro: number;
  
    @ApiProperty({ description: 'Cantidad de productos en el detalle' })
    cantidad: number;
  
    @ApiProperty({ description: 'Precio unitario del producto' })
    precioUnitario: number;
  
    @ApiProperty({ description: 'Lista de productos en este detalle', type: [Producto], required: false })
    productos?: Producto[];

    @ApiProperty({ description: 'Total del carro de compras' })
    totalCarro: number;
  }