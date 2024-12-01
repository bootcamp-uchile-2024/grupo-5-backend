import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { Comuna } from './comunas.entity';
import { UsuarioDto } from '../dto/read-usuario.dto';

@Entity('direcciones')
export class Direcciones {
    @PrimaryColumn({ name: 'iddireccion' })
    idDireccion: number;

    @Column({ name: 'idusuario' })
    idUsuario: number;

    @Column({ name: 'idcomuna' })
    idComuna: number;

    @Column({ name: 'alias' })
    alias: string;

    @Column({ name: 'calle' })
    calle: string;

    @Column({ name: 'numero' })
    numero: string;

    @Column({ name: 'depto' })
    zipCode: number;

    @Column({ name: 'referencias' })
    referencias: string;

    @Column({ name: 'personacontacto' })
    personaContacto: string;

    @Column({ name: 'telefonocontacto' })
    telefonoContacto: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'idusuario' }) 
    usuario: Usuario;

    @ManyToOne(() => Comuna)
    @JoinColumn({ name: 'idcomuna' }) 
    comuna: Comuna;
}
