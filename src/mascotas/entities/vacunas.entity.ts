import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { MascotasVacunas } from './mascotasvacunas.entity_DELETE';

@Entity('vacunas')
export class Vacuna {
    @PrimaryColumn()
    idVacuna: number;

    @Column()
    nombreVacuna: string;

    @OneToMany(() => MascotasVacunas, (mascotasVacunas) => mascotasVacunas.vacuna)
    mascotas: MascotasVacunas[];
}
