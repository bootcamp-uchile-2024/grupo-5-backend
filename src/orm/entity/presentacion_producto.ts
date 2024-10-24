import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'PRESENTACIONES_PRODUCTO' })
export class Presentacion_producto {
    @PrimaryColumn()
    idpresentacion: number;

    @Column()
    idproducto: number;

    @Column()
    precio: number;

    @Column()
    stock: number;

    @Column()
    peso: number;

    @Column()
    tamanio: number;

}

