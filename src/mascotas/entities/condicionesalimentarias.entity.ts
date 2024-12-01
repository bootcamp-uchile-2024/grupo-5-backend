import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Mascota } from './mascotas.entity';


@Entity('condiciones_alimentarias')
export class CondicionAlimentaria {
    @PrimaryColumn({ name: 'idcondicion' })
    idCondicion: number;

    @Column({ name: 'condicionalimentaria' })
    condicionalimentaria: string;

    @ManyToMany(() => Mascota, (mascota) => mascota.condicionesAlimentarias)
    mascotas: Mascota[];

}
