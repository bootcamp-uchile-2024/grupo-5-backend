import { Mascota } from 'src/mascotas/entities/mascotas.entity';
import { Pedido } from 'src/productos/entities/pedidos.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AvatarUsuarios } from './avatarusuarios.entity';
import { Direcciones } from './direcciones.entity';
import { Roles } from './roles.entity';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn({ name: 'idusuario' })
    idUsuario: number;

    @Column({name: 'rut', unique: true})
    rut: string;

    @Column({name: 'nombres'})
    nombres: string;  

    @Column({name: 'apellidos'})
    apellidos: string;

    @Column({name: 'email'})
    email: string;

    @Column({ name: 'telefono', nullable: true })
    telefono: number;

    @Column({ name: 'contrasena',  nullable: true })
    contrasena: string;

    @Column({ name: 'chkterminos', default: false })
    chkTerminos: boolean;

    @Column({name: 'chkofertas', default: false })
    chkOfertas: boolean;

    @Column({ name: 'activo', default: true })
    activo: boolean;

    // @ManyToOne(() => Roles, (rol) => rol.usuarios)
    // @JoinColumn({ name: 'idRol' })
    // rol: Roles

    // @ManyToOne(() => AvatarUsuarios)
    // @JoinColumn({ name: 'idImagenAvatar' })
    // avatar: AvatarUsuarios;

    @ManyToOne(() => Roles, (rol) => rol.idRol)
    @JoinColumn({ name: 'idrol' })
    idRol: number;

    @ManyToOne(() => AvatarUsuarios, (au) => au.idImagenAvatar)
    @JoinColumn({ name: 'idImagenAvatar' })
    avatar: number;

    @OneToMany(() => Direcciones, (direccion) => direccion.usuario)
    direcciones: Direcciones[];

    @OneToMany(() => Pedido, (pedido) => pedido.usuario)
    pedidos: Pedido[];

    @OneToMany(() => CarroCompra, (carro) => carro.idUsuario)
    carroCompra: CarroCompra[];

    @ManyToMany(() => Mascota, (mascota) => mascota.usuarios)
    mascotas: Mascota[];

}


