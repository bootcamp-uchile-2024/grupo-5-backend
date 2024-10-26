import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Mascota } from './mascotas.entity';


@Entity('condiciones_alimentarias')
export class CondicionAlimentaria {
    @PrimaryColumn()
    idCondicion: number;

    @Column()
    condicionalimentaria: string;

    @ManyToMany(() => Mascota, (mascota) => mascota.condicionesAlimentarias)
    mascotas: Mascota[];

}
