import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'DETALLE_PEDIDOS'})
export class Detalle_pedido {
    @PrimaryColumn({name: 'IDDETALLEPEDIDO'})
    iddetallepedido: number;

    @Column({name: 'IDUSUARIO'})
    idusuario: number;

    @Column({name: 'IDPEDIDO'})
    idpedido: number;

    @Column({name: 'CANTIDADPRODUCTO'})
    cantidadproducto: number;

    @Column({name: 'PRECIOPRODUCTO'})
    precioproducto: number;
}