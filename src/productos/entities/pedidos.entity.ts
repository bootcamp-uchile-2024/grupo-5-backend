import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import {  Column,  Entity,  JoinColumn,  JoinTable,  ManyToMany,  ManyToOne,  OneToMany,  PrimaryColumn,} from 'typeorm';
import { DetallesPedidos } from './detallespedidos.entity';
import { Producto } from './producto.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryColumn({ name: 'idpedido' })
  idPedido: number;

  @Column({ name: 'fechacreacion' })
  fechaCreacion: Date;

  @Column({ name: 'fechaentrega' })
  fechaEntrega: Date;

  @Column({ name: 'preciototal' })
  precioTotal: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idusuario' })
  usuario: Usuario;

  @OneToMany(() => DetallesPedidos, (dp) => dp.pedido)
  detallePedido: DetallesPedidos[];
  @ManyToOne(() => Usuario)

  @OneToMany(() => Producto, (p) => p.idProducto)
  producto: Producto[]; 
}
