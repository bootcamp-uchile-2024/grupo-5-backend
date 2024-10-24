import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'ROLES'})
export class Rol {
    @PrimaryColumn()
    idrol: number; 
  
    @Column()
    rol: string;
  }