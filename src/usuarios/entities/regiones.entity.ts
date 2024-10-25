import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Comuna } from './comunas.entity'; // Asegúrate de que la ruta sea correcta

@Entity('regiones')
export class Region {
  @PrimaryColumn()
  idRegion: number;

  @Column()
  orden: number;

  @Column()
  nombreRegion: string;

  // Relación con la entidad Comuna
  @OneToMany(() => Comuna, (comuna) => comuna.region)
  comunas: Comuna[];
}
