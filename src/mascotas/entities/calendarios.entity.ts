import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Frecuencia } from './frecuncias.entity';
import { Mascota } from './mascotas.entity';

@Entity('calendarios')
export class Calendario {
  @PrimaryColumn({ name: 'idevento' })
  idevento: number;

  // @Column({ name: 'idfrecuencia' })
  // idfrecuencia: number;

  // @Column({ name: 'idmascota' })
  // idmascota: number;

  @Column({ name: 'fechaevento' })
  fechaevento: Date;

  @Column({ name: 'etiqueta' })
  etiqueta: string;

  @Column({ name: 'motivocalendario' })
  motivocalendario: string;

  @ManyToOne(() => Frecuencia)
  @JoinColumn({ name: 'idfrecuencia' })
  idFrecuencia: Frecuencia;

  @ManyToOne(() => Mascota)
  @JoinColumn({ name: 'idMascota' })
  mascota: Mascota;
}
