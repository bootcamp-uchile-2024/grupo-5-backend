import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'CARRO_COMPRAS'})
export class Carro_Compra {
    @PrimaryColumn({name: 'IDCARROCOMPRAS'})
    idcarrocompras: number;

    @Column({name: 'IDUSUARIO'})
    idusuario: number;

    @Column({name: 'FECHACREACION'})
    fechacreacion: Date;
}

