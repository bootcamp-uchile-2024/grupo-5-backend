import {  Column,  Entity,  JoinColumn,  JoinTable,  ManyToMany,  ManyToOne,  PrimaryColumn,} from 'typeorm';
import { Pedido } from './pedidos.entity';
import { Producto } from './producto.entity';

@Entity('detalles_pedidos')
export class DetallesPedidos {
  @PrimaryColumn({ name: 'iddetallepedido' })
  idDetallePedido: number;

  @ManyToOne(() => Pedido)
  @JoinColumn({ name: 'idpedido' })
  pedido: Pedido;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'idproducto' })
  producto: Producto;

  @Column({ name: 'cantidadproducto' })
  cantidadProducto: number;

  @Column({ name: 'precioproducto' })
  precioProducto: number;

}

