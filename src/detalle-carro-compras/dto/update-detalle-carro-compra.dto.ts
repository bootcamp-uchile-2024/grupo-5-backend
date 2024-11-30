import { PartialType } from "@nestjs/swagger";
import { CreateDetalleCarroCompraDto } from "./create-detalle-carro-compra.dto";

export class UpdateDetalleCarrocompraDto extends PartialType(CreateDetalleCarroCompraDto) {}
