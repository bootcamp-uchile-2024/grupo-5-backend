import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { Comuna } from './comunas.entity';

@Entity('direcciones')
export class Direcciones {
    @PrimaryColumn()
    idDireccion: bigint;

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
    //VALIDAR
    @ManyToOne(() => Usuario, (usuario) => usuario.direcciones)
    @JoinColumn({ name: 'idUsuario' }) 
    usuario: Usuario;

    @ManyToOne(() => Comuna, (comuna) => comuna.direcciones)
    @JoinColumn({ name: 'idComuna' }) 
    comuna: Comuna;
}
