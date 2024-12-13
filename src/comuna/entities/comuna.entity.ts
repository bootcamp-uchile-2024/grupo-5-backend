import {   Entity,   PrimaryColumn,   Column,   ManyToOne,   OneToMany,   JoinColumn } from 'typeorm';
import { Region } from '../../region/entities/region.entity';
import { Direcciones } from 'src/direcciones/entities/direcciones.entity';

@Entity('comunas')
export class Comuna {
  @PrimaryColumn({ name: 'idcomuna' })
  idComuna: number;

  @Column({ name: 'idregion' })
  idRegion: number;

  @Column({ name: 'nombrecomuna' })
  nombreComuna: string;

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'idregion' })
  region: Region;

  @OneToMany(() => Direcciones, (direccion) => direccion.comuna)
  direcciones: Direcciones[];
}
