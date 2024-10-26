import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { Comuna } from './comunas.entity';
import { UsuarioDto } from '../dto/read-usuario.dto';

@Entity('direcciones')
export class Direcciones {
    @PrimaryColumn()
    idDireccion: number;

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

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'idUsuario' }) 
    usuario: Usuario;

    @ManyToOne(() => Comuna)
    @JoinColumn({ name: 'idComuna' }) 
    comuna: Comuna;
}
