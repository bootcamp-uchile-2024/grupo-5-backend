import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Timestamp } from 'typeorm';
import { Mascota } from './mascotas.entity'; 

@Entity('registros_medicos')
export class RegistroMedico {
    @PrimaryColumn({ name: 'idregistromedico' })
    idRegistroMedico: number;

    @Column({name: 'fecharegistro'})
    fechaRegistro: Date;

    @Column({name: 'horaregistro'})
    horaRegistro: Date;

    @Column({name: 'motivo'})
    motivo: string;
    
    @ManyToOne(() => Mascota)
    @JoinColumn({ name: 'idMascota' })
    mascota: Mascota;
}
