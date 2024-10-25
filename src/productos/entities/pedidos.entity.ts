import {     Entity,     PrimaryColumn,     Column,     OneToMany } from 'typeorm';
import { DetallePedido } from './detalle_pedido.entity';
import { ProductoPedido } from './producto_pedido.entity';

@Entity('PEDIDOS')
export class Pedido {
    @PrimaryColumn()
    idPedido: number;

    @Column({ nullable: true })
    fechaCreacion: Date;

    @Column({ nullable: true })
    fechaEntrega: Date;

    @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido)
    detallesPedido: DetallePedido[];

    @OneToMany(() => ProductoPedido, (productoPedido) => productoPedido.pedido)
    productosPedidos: ProductoPedido[];
}
