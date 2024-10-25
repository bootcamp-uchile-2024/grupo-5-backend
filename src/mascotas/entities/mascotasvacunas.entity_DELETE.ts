import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Mascota } from './mascotas.entity';
import { Vacuna } from './vacunas.entity';

@Entity('mascotas_vacunas')
export class MascotasVacunas {
    @PrimaryColumn()
    idVacuna: number;

    @PrimaryColumn()
    idMascota: bigint;

    @ManyToOne(() => Mascota, (mascota) => mascota.vacunas)
    @JoinColumn({ name: 'idMascota' }) 
    mascota: Mascota;

    @ManyToOne(() => Vacuna, (vacuna) => vacuna.mascotas)
    @JoinColumn({ name: 'idVacuna' })
    vacuna: Vacuna;
}
