import { CarroCompra } from "src/carro-compras/entities/carro-compra.entity";
import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity('detalles_carro_compra')
export class DetalleCarroCompra {

  @PrimaryGeneratedColumn()
  idDetalleCarro: number;

  @ManyToOne(() => CarroCompra)
  @JoinColumn({name : 'idCarroCompras'})	
  carroCompra: CarroCompra;

  @ManyToOne(() => Producto)
  @JoinColumn({name : 'idProducto'})
  producto: Producto;

  @Column()
  cantidad: number;

  @Column()
  precioUnitario: number;

}
