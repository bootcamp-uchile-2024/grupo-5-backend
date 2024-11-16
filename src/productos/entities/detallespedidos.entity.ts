import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Pedido } from './pedidos.entity';
import { Producto } from './producto.entity';

@Entity('detalles_pedidos')
export class DetallesPedidos {
  @PrimaryColumn()
  idDetallePedido: number;

  @Column()
  cantidadProducto: number;

  @Column()
  precioProducto: number;

  @ManyToOne(() => Pedido)
  @JoinColumn({ name: 'idPedido' })
  pedido: Pedido;

  @ManyToMany(() => Producto)
  @JoinTable({
    name: 'PRODUCTOS_PEDIDOS',
    joinColumn: {
      name: 'idDetallePedido',
      referencedColumnName: 'idDetallePedido',
    },
    inverseJoinColumn: {
      name: 'idProducto',
      referencedColumnName: 'idProducto',
    },
  })
  productos: Producto[];
}

// LIBRO = DETALLE_CARRO_COMPRA
