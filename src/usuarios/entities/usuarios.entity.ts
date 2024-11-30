import { Mascota } from 'src/mascotas/entities/mascotas.entity';
import { Pedido } from 'src/productos/entities/pedidos.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { AvatarUsuarios } from './avatarusuarios.entity';
import { Direcciones } from './direcciones.entity';
import { Roles } from './roles.entity';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';

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

    @Column({ default: true })
    activo: boolean;

    // @ManyToOne(() => Roles, (rol) => rol.usuarios)
    // @JoinColumn({ name: 'idRol' })
    // rol: Roles

    // @ManyToOne(() => AvatarUsuarios)
    // @JoinColumn({ name: 'idImagenAvatar' })
    // avatar: AvatarUsuarios;

    @ManyToOne(() => Roles, (rol) => rol.idRol)
    @JoinColumn({ name: 'idRol' })
    rol: number;

    @ManyToOne(() => AvatarUsuarios, (au) => au.idImagenAvatar)
    @JoinColumn({ name: 'idImagenAvatar' })
    avatar: number;

    @OneToMany(() => Direcciones, (direccion) => direccion.usuario)
    direcciones: Direcciones[];

    @OneToMany(() => Pedido, (pedido) => pedido.idUSsuario)
    pedidos: Pedido[];

    @OneToMany(() => CarroCompra, (carro) => carro.idUsuario)
    carroCompra: CarroCompra[];

    @ManyToMany(() => Mascota, (mascota) => mascota.usuarios)
    mascotas: Mascota[];

}


