import { IsArray, IsDate, IsInt, IsNumber } from "class-validator";
import { CreateCarroCompraDto } from "./create-carroCmpra.dto";
import { Producto } from "src/productos/entities/producto.entity";

export class CreateDetalleCarroCompraDto {

    idDetalleCarro: number;

    @IsInt()
    idCarroCompras: number;
  
    cantidad: number;

    precioUnitario: number;

    productos: Producto[];

}
