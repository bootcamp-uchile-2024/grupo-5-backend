import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuarios.entity';

@Entity('roles')
export class Roles {
    @PrimaryColumn({ name: 'idrol' })
    idRol: number;

    @Column({ name: 'rol' })
    rol: string;

    @OneToMany(() => Usuario, (usuario) => usuario.idRol)   
    usuarios: Usuario[];
}
