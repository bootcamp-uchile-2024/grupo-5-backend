import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Calendario } from './calendarios.entity';

@Entity('frecuencias')
export class Frecuencia {
    @PrimaryColumn()
    idFrecuencia: number;

    @Column()
    frecuencia: string;

    @OneToMany(() => Calendario, (calendario) => calendario.idFrecuencia)
    calendarios: Calendario[];
}
