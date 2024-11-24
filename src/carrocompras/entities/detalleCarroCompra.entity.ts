import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarroCompras } from "./carroCompra.entity";



@Entity('detalles_carro_compra')
export class DetalleCarroCompra {

  @PrimaryGeneratedColumn()
  idDetalleCarro: number;

  @ManyToOne(() => CarroCompras)
  @JoinColumn({name : 'idCarroCompras'})	
  carroCompras: CarroCompras;

  @ManyToOne(() => Producto, (producto) => producto.detallesCarroCompra)
  @JoinColumn()
  producto: Producto;

  @Column()
  cantidad: number;

  @Column()
  precioUnitario: number;

}
