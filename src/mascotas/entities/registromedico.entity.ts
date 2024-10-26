import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Mascota } from './mascotas.entity'; 

@Entity('registros_medicos')
export class RegistroMedico {
    @PrimaryColumn()
    idRegistroMedico: number;

    @Column()
    fechaRegistro: Date;

    @Column()
    horaRegistro: Date;

    @Column()
    motivo: string;

    
    @ManyToOne(() => Mascota)
    @JoinColumn({ name: 'idMascota' })
    mascota: Mascota;
}
