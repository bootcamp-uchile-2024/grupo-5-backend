import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Mascota } from "./mascotas.entity";

@Entity({name: 'enfermedades_base'})
export class Enfermedad_Base {
    @PrimaryColumn({name: 'idenfermedad'})
    idEnfermedad: number;

    @Column({name: 'nombreenfermedad'})
    nombreEnfermedad: string;

    @ManyToMany(() => Mascota, (mascota) => mascota.enfermedades)
    mascotas: Mascota[];
}

