import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Raza } from './razas.entity';

@Entity('especies')
export class Especie {
    @PrimaryColumn()
    idEspecie: number;

    @Column()
    nombreEspecie: string;

    @OneToMany(() => Raza, (raza) => raza.especie)
    razas: Raza[];
}
