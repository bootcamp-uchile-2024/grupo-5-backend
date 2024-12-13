import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Comuna } from '../../comuna/entities/comuna.entity'; // Asegúrate de que la ruta sea correcta

@Entity('regiones')
export class Region {
  @PrimaryColumn({name: 'idregion'})
  idRegion: number;

  @Column({name: 'orden'})
  orden: number;

  @Column({name: 'nombreregion'})
  nombreRegion: string;

  @OneToMany(() => Comuna, (comuna) => comuna.region)
  comunas: Comuna[];
}
