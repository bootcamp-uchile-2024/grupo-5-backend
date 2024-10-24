import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'PRODUCTOS'})
export class Producto {
    @PrimaryColumn({name: 'IDPRODUCTO'})
    idproducto: number;

    @Column({name: 'IDMARCA'})
    idmarca: number;

    @Column({name: 'IDCATEGORIA'})
    idcategoria: number;

    @Column({name: 'NOMBREPRODUCTO'})
    nombreproducto: string;

    @Column({name: 'SKU'})
    sku: string;

    @Column({name: 'DESCRIPCION'})
    descripcion: string;
}
