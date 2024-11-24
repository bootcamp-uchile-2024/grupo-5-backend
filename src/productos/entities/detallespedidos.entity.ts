import {  Column,  Entity,  JoinColumn,  JoinTable,  ManyToMany,  ManyToOne,  PrimaryColumn,} from 'typeorm';
import { Pedido } from './pedidos.entity';
import { Producto } from './producto.entity';

@Entity('detalles_pedidos')
export class DetallesPedidos {
  @PrimaryColumn()
  idDetallePedido: number;

  @ManyToOne(() => Pedido)
  @JoinColumn({ name: 'idPedido' })
  pedido: Pedido;


  //FALTA PRODUCTO

  @Column()
  cantidadProducto: number;

  @Column()
  precioProducto: number;

}

// LIBRO = DETALLE_CARRO_COMPRA
