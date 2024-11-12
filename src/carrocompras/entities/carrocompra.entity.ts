import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import { DetalleCarroCompra } from './detallescarrocompra.entity';

@Entity('carro_compras')
export class CarroCompras {
  @PrimaryGeneratedColumn()
  idCarroCompras: number;

  @Column()
  idUsuario: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @OneToMany(() => DetalleCarroCompra, (detalleCarroCompra) => detalleCarroCompra.carroCompra, { cascade: true })
  detalleCarroCompra: DetalleCarroCompra[];
}
