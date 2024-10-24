import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'CONDICIONES_ALIMENTARIAS'})
export class Condicion_Alimentaria {
    @PrimaryColumn({name: 'IDCONDICION'})
    idcondicion: number;

    @Column({name: 'CONDICIONALIMENTARIA'})
    condicionalimentaria: string;
}

