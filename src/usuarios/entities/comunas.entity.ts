import {   Entity,   PrimaryColumn,   Column,   ManyToOne,   OneToMany,   JoinColumn } from 'typeorm';
import { Direcciones } from './direcciones.entity';
import { Region } from './regiones.entity';

@Entity('COMUNAS')
export class Comuna {
  @PrimaryColumn()
  idComuna: number;

  @Column()
  idRegion: number;

  @Column()
  nombreComuna: string;

  @ManyToOne(() => Region, (region) => region.comunas)
  @JoinColumn({ name: 'idRegion' })
  region: Region;



  @OneToMany(() => Direcciones, (direccion) => direccion.comuna)
  direcciones: Direcciones[];
}
