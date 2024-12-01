import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuarios.entity'; 

@Entity('avatar_usuarios')
export class AvatarUsuarios {
    @PrimaryColumn( {name: 'idimagenavatar'})
    idImagenAvatar: number;

    @Column({name: 'pathimausuario'})
    pathImaUsuario: string;

    @OneToMany(() => Usuario, (usuario) => usuario.avatar)
    usuarios: Usuario[];
}