import { UserRole } from 'src/usuarios/roles.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from './pedidos.entity';

@Entity('usuarios')
export class Usuario {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  rutUsuario: string;

  @Column()
  contrasena: string;

  @Column()
  nombre: string;

  @Column()
  apePaterno: string;

  @Column()
  apeMaterno: string;

  @Column({ unique: true })
  correoElectronico: string;

  @Column()
  telefono: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.INVITADO
  })
  rolUsuario: UserRole;


  @OneToMany(() => Pedido, (p) => p.idUSsuario)
pedidos: Pedido[];
}
