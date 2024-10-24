import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'ESPECIES'})
export class Especie {
    @PrimaryColumn({name: 'IDESPECIE'})
    idespecie: number;

    @Column({name: 'NOMBREESPECIE'})
    nombreespecie: string;
}

