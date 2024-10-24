import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'REGIONES' })
export class Region {
    @PrimaryColumn()
    idregion: number; 
  
    @Column()
    orden: number; 
  
    @Column({ length: 100 })
    nombreregion: string;
  }