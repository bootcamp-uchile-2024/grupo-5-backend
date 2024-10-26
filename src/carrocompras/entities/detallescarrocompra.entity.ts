import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CarroCompras } from "./carrocompra.entity";

@Entity('DETALLES_CARRO_COMPRA')
export class DetalleCarroCompra {
  @PrimaryColumn()
  idDetalleCarro: number;
  
  @Column()
  cantidad: number;
  
  @Column()
  precioUnitario: number;
  
  @ManyToOne(() => CarroCompras)
  @JoinColumn({ name: 'idCarroCompras' })
  carroCompra: CarroCompras[];


}