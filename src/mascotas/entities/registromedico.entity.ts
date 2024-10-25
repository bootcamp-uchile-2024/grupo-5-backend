import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Mascota } from './mascotas.entity'; 

@Entity('registros_medicos')
export class RegistroMedico {
    @PrimaryColumn()
    idRegistroMedico: bigint;

    @Column()
    fechaRegistro: Date;

    @Column()
    horaRegistro: Date;

    @Column()
    motivo: string;

    
    @ManyToOne(() => Mascota, (mascota) => mascota.registrosMedicos)
    @JoinColumn({ name: 'idMascota' })
    mascota: Mascota;
}
