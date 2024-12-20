import { Comuna } from 'src/comuna/entities/comuna.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('direcciones')
export class Direccion {
    @PrimaryGeneratedColumn({ name: 'iddireccion' })
    idDireccion: number;

    @Column({ name: 'alias' })
    alias: string;

    @Column({ name: 'calle' })
    calle: string;

    @Column({ name: 'numero' })
    numero: string;

    @Column({ name: 'referencias' })
    referencias: string;

    @Column({ name: 'personacontacto' })
    personaContacto: string;

    @Column({ name: 'telefonocontacto' })
    telefonoContacto: string;

    @Column({ name: 'activo'})
    activo: boolean;
    
    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'idUsuario' }) 
    usuario: Usuario;

    @ManyToOne(() => Comuna)
    @JoinColumn({ name: 'idComuna' }) 
    comuna: Comuna;
}
