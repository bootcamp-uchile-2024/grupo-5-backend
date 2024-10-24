import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'IMAGENES_PRODUCTOS'})
export class Imagen_Producto {
    @PrimaryColumn({name: 'IDIMAGEN'})
    idimagen: number;

    @Column({name: 'IDPRODUCTO'})
    idproducto: number;

    @Column({name: 'PATHIMAPRODUCTOS'})
    pathimaproductos: string;
}
