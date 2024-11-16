import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { DetallesPedidos } from './detallespedidos.entity';
import { Producto } from './producto.entity';

@Entity('PEDIDOS')
export class Pedido {
  @PrimaryColumn({ name: 'idpedido' })
  idPedido: number;

  @Column({ name: 'fechaCreacion' })
  fechaCreacion: Date;

  @Column({ name: 'fechaEntrega' })
  fechaEntrega: Date;

  @Column({ name: 'preciototal' })
  precioTotal: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuario' })
  idUSsuario: Usuario;

  @OneToMany(() => DetallesPedidos, (detallePedido) => detallePedido.pedido)
  detallePedido: DetallesPedidos[];

  @ManyToMany(() => Producto)
  @JoinTable({
    name: 'PRODUCTOS_PEDIDOS',
    joinColumn: { name: 'idPedido', referencedColumnName: 'idPedido' },
    inverseJoinColumn: {
      name: 'idProducto',
      referencedColumnName: 'idProducto',
    },
  })
  productos_pedido: Producto[];
}
