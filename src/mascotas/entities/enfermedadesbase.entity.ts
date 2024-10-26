import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Mascota } from "./mascotas.entity";

@Entity({name: 'ENFERMEDADES_BASE'})
export class Enfermedad_Base {
    @PrimaryColumn()
    idEnfermedad: number;

    @Column()
    nombreEnfermedad: string;

    @ManyToMany(() => Mascota, (mascota) => mascota.enfermedades)
    mascotas: Mascota[];
}

