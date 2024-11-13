import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuarios.entity'; 

@Entity('avatar_usuarios')
export class AvatarUsuarios {
    @PrimaryColumn()
    idImagenAvatar: number;

    @Column()
    pathImaUsuario: string;

    @OneToMany(() => Usuario, (usuario) => usuario.avatar)
    usuarios: Usuario[];
}