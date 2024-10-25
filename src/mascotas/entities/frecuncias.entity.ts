import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('frecuencias')
export class Frecuencia {
    @PrimaryColumn()
    idFrecuencia: number;

    @Column()
    frecuencia: string;
}
