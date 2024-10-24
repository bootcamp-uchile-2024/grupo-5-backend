import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'ATRIBUTOS_ESPECIFICOS'})
export class Atributo_especifico {
    @PrimaryColumn({name: 'IDATRIBUTO'})
    idatributo: number;

    @Column({name: 'IDPRODUCTO'})
    idproducto: number;

    @Column({name: 'CARACTERISTICA'})
    caracteristica: string;

    @Column({name: 'VALOR'})
    valor: string;
}
