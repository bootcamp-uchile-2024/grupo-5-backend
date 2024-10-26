import {     Entity,     PrimaryColumn,     Column,     OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import { DetallesPedidos } from './detallespedidos.entity';
import { Producto } from './producto.entity';

@Entity('PEDIDOS')
export class Pedido {
    @PrimaryColumn()
    idPedido: number;

    @Column({ nullable: true })
    fechaCreacion: Date;

    @Column({ nullable: true })
    fechaEntrega: Date;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'idUsuario' })
    usuario: Usuario;

    @OneToMany(() => DetallesPedidos, (detallePedido) => detallePedido.pedido)
    detallesPedido: DetallesPedidos[];

    @ManyToMany(() => Producto)
    @JoinTable({ name: 'PRODUCTOS_PEDIDOS',
      joinColumn: { name: 'idPedido', referencedColumnName: 'idPedido' },
      inverseJoinColumn: { name: 'idProducto', referencedColumnName: 'idProducto' },
    })
    productos_pedido: Producto[]; 

}
