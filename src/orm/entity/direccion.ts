import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Comuna } from "./comuna";
import { Usuario } from "./usuario";

@Entity({name: 'DIRECCIONES'})
export class Direccion {
    @PrimaryColumn()
    iddireccion: number; 

    @Column()
    idUsuario: number;

    @Column()
    idComuna: number;

    @Column()
    alias: string;
  
    @Column() 
    calle: string; 
  
    @Column()
    numero: string;
  
    @Column() 
    zipCode: number; 
  
    @Column()
    referencias: string;
  
    @Column()
    personaContacto: string; 
  
    @Column()
    telefonoContacto: number; 

    @ManyToOne(() => Usuario, (usuario) => usuario.direcciones)
    @JoinColumn({ name: 'idUsuario' })
    usuario: Usuario;

    @ManyToOne(() => Comuna)
    @JoinColumn({ name: 'idComuna' })
    comuna: Comuna;

    }