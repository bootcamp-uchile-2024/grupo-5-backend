import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'VACUNAS' })
export class Vacuna {
    @PrimaryColumn({ name: 'IDVACUNA' })
    idvacuna: number;

    @Column({ name: 'NOMBREVACUNA' })
    nombrevacuna: string;

}
