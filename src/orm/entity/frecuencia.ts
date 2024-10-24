import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'FRECUENCIAS'})
export class Frecuencia {
    @PrimaryColumn({name: 'IDFRECUENCIA'})
    idfrecuencia: number;

    @Column({name: 'FRECUENCIA'})
    frecuencia: string; 
}

