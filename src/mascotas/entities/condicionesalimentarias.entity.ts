import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { MascotasCondiciones } from './mascotascondiciones.entity';

@Entity('condiciones_alimentarias')
export class CondicionAlimentaria {
    @PrimaryColumn()
    idCondicion: number;

    @Column()
    condicionalimentaria: string;

    @OneToMany(() => MascotasCondiciones, (mascotasCondiciones) => mascotasCondiciones.condicion)
    mascotas: MascotasCondiciones[];
}
