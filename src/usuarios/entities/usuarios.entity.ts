import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { AvatarUsuarios } from './avatarusuarios.entity';
import { UsuariosMascotas } from './usuariomascotas.entity';

import { Direcciones } from './direcciones.entity';
import { Roles } from './roles.entity';

@Entity('usuarios')
export class Usuario {
    @PrimaryColumn()
    idUsuario: number;

    @Column()
    rut: string;

    @Column()
    nombreUsuario: string;

    @Column()
    apellidos: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    telefono: number;

    @Column({ nullable: true })
    contrasena: string;

    @Column({ default: false })
    chkTerminos: boolean;

    @Column({ default: false })
    chkOfertas: boolean;

    @ManyToOne(() => Roles, (rol) => rol.usuarios)
    @JoinColumn({ name: 'idRol' })
    rol: Roles;

    @ManyToOne(() => AvatarUsuarios, (avatar) => avatar.usuarios)
    @JoinColumn({ name: 'idImagenAvatar' })
    avatar: AvatarUsuarios;


    @OneToMany(() => Direcciones, (direccion) => direccion.usuario)
    direcciones: Direcciones[];

    @OneToMany(() => UsuariosMascotas, (usuarioMascota) => usuarioMascota.usuario)
    mascotas: UsuariosMascotas[];

    @OneToMany(() => Pedido, (pedido) => pedido.usuario)
    pedidos: Pedido[];
}
