import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Frecuencia } from './frecuncias.entity';
import { Mascota } from './mascotas.entity';

@Entity('calendarios')
export class Calendario {
  @PrimaryColumn()
  idevento: number;

  @Column()
  idfrecuencia: number;

  @Column()
  idmascota: number;

  @Column()
  fechaevento: Date;

  @Column()
  etiqueta: string;

  @Column()
  motivocalendario: string;


  @ManyToOne(() => Frecuencia)
  @JoinColumn({ name: 'IdFrecuencia' })
  idFrecuencia: Frecuencia;


  @ManyToOne(() => Mascota)
  @JoinColumn({ name: 'IdMascota' })
  idMascota: Mascota;
}
