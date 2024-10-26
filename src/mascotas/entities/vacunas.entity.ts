import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Mascota } from './mascotas.entity';


@Entity('vacunas')
export class Vacuna {
    @PrimaryColumn()
    idVacuna: number;

    @Column()
    nombreVacuna: string;

    @ManyToMany(() => Mascota, (mascota) => mascota.vacunas)
    mascotas: Mascota[];
}
