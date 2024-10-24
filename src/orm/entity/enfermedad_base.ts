import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'ENFERMEDADES_BASE'})
export class Enfermedad_Base {
    @PrimaryColumn()
    IDESNFERMEDAD: number;

    @Column()
    NOMBREENFERMEDAD: string;
}

