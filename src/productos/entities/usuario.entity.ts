import { UserRole } from 'src/usuarios/roles.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from './pedidos.entity';

@Entity('usuarios')
export class Usuario {

  @PrimaryGeneratedColumn({ name: 'idusuario' })
  id: string;

  @Column({name: 'rut', unique: true })
  rutUsuario: string;

  @Column({name: 'contrasena'})
  contrasena: string;

  @Column({name: 'nombreusuario'})
  nombre: string;

  @Column({name: 'apellidos'})
  apePaterno: string;

  // @Column()
  // apeMaterno: string;

  @Column({ name: 'email', unique: true })
  correoElectronico: string;

  @Column({ name: 'telefono' })
  telefono: string;

  @Column({name: 'idrol',
    type: 'enum',
    enum: UserRole,
    default: UserRole.INVITADO
  })
  rolUsuario: UserRole;

  @OneToMany(() => Pedido, (p) => p.idUSsuario)
pedidos: Pedido[];
}
