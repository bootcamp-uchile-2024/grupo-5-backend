import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Especie } from './especies.entity';
import { Mascota } from './mascotas.entity'; 

@Entity('razas')
export class Raza {
    @PrimaryColumn({ name: 'idraza' })
    idRaza: number;

    @Column({ name: 'nombreraza' })
    nombreRaza: string;

    @OneToMany(() => Mascota, (mascota) => mascota.raza)
    mascotas: Mascota[];

    @ManyToOne(() => Especie)
    @JoinColumn({ name: 'idespecie' })
    especie: Especie;

}
