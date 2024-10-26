import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Pedido } from "./pedidos.entity";


@Entity('detalles_pedidos')
export class DetallesPedidos {
    @PrimaryColumn()
    idDetallePedido: number;

    @Column()
    cantidadProducto: number;

    @Column()
    precioProducto: number;

    @ManyToOne(() => Pedido)
    @JoinColumn({ name: 'pedidoId' }) 
    pedido: Pedido;
}