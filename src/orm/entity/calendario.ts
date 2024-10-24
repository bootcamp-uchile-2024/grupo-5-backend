import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'CALENDARIOS' })
export class Calendario {
    @PrimaryColumn({ name: 'IDEVENTO' })
    idEvento: number;

    @Column({ name: 'IDFRECUENCIA' })
    idFrecuencia: number;

    @Column({ name: 'IDMASCOTA' })
    idMascota: number;

    @Column({ name: 'FECHAEVENTO' })    
    fechaEvento: Date;  

    @Column({ name: 'ETIQUETA' })
    etiqueta: string;

    @Column({ name: 'MOTIVOCALENDARIO' })
    motivoCalendario: string;
}

