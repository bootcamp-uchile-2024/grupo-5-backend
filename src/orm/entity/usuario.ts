import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Direccion } from "./direccion";

@Entity({name: 'USUARIOS'})
export class Usuario {

    @PrimaryColumn()
    idusuario: number;
    
    @Column()
    rut: string; 
  
    @Column()
    nombreusuario: string;
  
    @Column({ type: 'varchar', length: 100 }) 
    apellidos: string; 
  
    @Column({ type: 'varchar', length: 100 }) 
    email: string; 
  
    @Column({ type: 'int', nullable: true }) 
    telefono: number; 
  
    @Column({ type: 'varchar', length: 100, nullable: true })
    contrasena: string; 
  
    @Column({ type: 'boolean', nullable: true }) 
    chkterminos: boolean; 
  
    @Column({ type: 'boolean', nullable: true })
    chkofertas: boolean; 

    @OneToMany(() => Direccion, (direccion) => direccion.usuario)
    direcciones: Direccion[];
  
  }