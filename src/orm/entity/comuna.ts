import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Region } from "./region";

@Entity({name: 'COMUNAS'})
export class Comuna {
    @PrimaryColumn()
    idComuna: number;
  
    @Column() 
    nombreComuna: string; 

    @Column()
    idRegion: number;
  
    @ManyToOne(() => Region)
    @JoinColumn({ name: 'idRegion' })
    region: Region;
  }