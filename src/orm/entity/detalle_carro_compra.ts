import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'DETALLES_CARRO_COMPRA'})
export class Detalle_Carro_Compra {
    @PrimaryColumn({name: 'IDDETALLECARRO'})
    iddetallecarro: number;

    @Column({name: 'IDCARROCOMPRAS'})
    idcarrocompras: number;

    @Column({name: 'CANTIDAD'})
    cantidad: number;

    @Column({name: 'PRECIOUNITARIO'})
    preciounitario: number;
}
