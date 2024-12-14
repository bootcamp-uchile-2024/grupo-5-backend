import {   Entity,   PrimaryColumn,   Column,   ManyToOne,   OneToMany,   JoinColumn } from 'typeorm';
import { Region } from '../../region/entities/region.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';

@Entity('comunas')
export class Comuna {
  @PrimaryColumn({ name: 'idcomuna' })
  idComuna: number;

  @Column({ name: 'nombrecomuna' })
  nombreComuna: string;

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'idRegion' })
  region: Region;

  @OneToMany(() => Direccion, (direccion) => direccion.comuna)
  direcciones: Direccion[];
}
