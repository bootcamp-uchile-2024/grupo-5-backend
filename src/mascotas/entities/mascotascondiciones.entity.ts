import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Mascota } from './mascotas.entity'; 
import { CondicionAlimentaria } from './condicionesalimentarias.entity';

@Entity('mascotas_condiciones')
export class MascotasCondiciones {
    @PrimaryColumn()
    idMascota: bigint;

    @PrimaryColumn()
    idCondicion: number;

    @ManyToOne(() => Mascota, (mascota) => mascota.condiciones)
    @JoinColumn({ name: 'idMascota' })
    mascota: Mascota;

    @ManyToOne(() => CondicionAlimentaria, (condicion) => condicion.mascotas)
    @JoinColumn({ name: 'idCondicion' })
    condicion: CondicionAlimentaria;
}
