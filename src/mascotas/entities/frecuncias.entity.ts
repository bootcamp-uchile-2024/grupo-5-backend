import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Calendario } from './calendarios.entity';

@Entity('frecuencias')
export class Frecuencia {
    @PrimaryColumn({name: 'idfrecuencia'})
    idFrecuencia: number;

    @Column({name: 'frecuencia'})
    frecuencia: string;

    @OneToMany(() => Calendario, (calendario) => calendario.idFrecuencia)
    calendarios: Calendario[];
}
