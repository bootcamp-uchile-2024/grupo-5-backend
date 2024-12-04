import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Mascota } from './mascotas.entity';
import { Vacuna } from './vacunas.entity';

@Entity('mascotas_vacunas')
export class MascotasVacunas {
    @PrimaryColumn({name: 'idvacuna'})
    idVacuna: number;

    @PrimaryColumn([{name: 'idmascota'}])
    idMascota: bigint;

    @ManyToOne(() => Mascota, (mascota) => mascota.vacunas)
    @JoinColumn({ name: 'idmascota' }) 
    mascota: Mascota;

    @ManyToOne(() => Vacuna, (vacuna) => vacuna.mascotas)
    @JoinColumn({ name: 'idvacuna' })
    vacuna: Vacuna;
}
