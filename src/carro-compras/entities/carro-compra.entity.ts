import { DetalleCarroCompra } from 'src/detalle-carro-compras/entities/detalle-carro-compra.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('carro_compras')
export class CarroCompra {
  @PrimaryGeneratedColumn({ name: 'idcarrocompras' })
  idCarroCompra: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @OneToMany(() => DetalleCarroCompra, (dc) => dc.carroCompra)
  detallesCarro: DetalleCarroCompra[];
}
