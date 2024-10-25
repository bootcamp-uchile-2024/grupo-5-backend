import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuarios.entity';

@Entity('roles')
export class Roles {
    @PrimaryColumn()
    idRol: number;

    @Column()
    rol: string;

    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[];
}
