import { Producto } from 'src/productos/entities/producto.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { DetalleCarroCompra } from './detalleCarroCompra.entity';

@Entity('carro_compras')
export class CarroCompras {
  @PrimaryColumn({ name: 'idcarrocompras' })
  idCarroCompras: number;

  // @Column()
  // idUsuario: number;

  @Column({ name: 'fechacreacion' })
  fechaCreacion: Date;

  @Column({ name: 'preciototal' })
  precioTotal: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuario' })
  idUsuario: number;

  @OneToMany(() => DetalleCarroCompra, (detalleCarro) => detalleCarro.CarroCompras)
  detallesCarro: DetalleCarroCompra[];

  @ManyToMany(() => Producto)
  @JoinTable({
    name: 'PRODUCTOS_CARRO',
    joinColumn: {
      name: 'idCarroCompras',
      referencedColumnName: 'idCarroCompras',
    },
    inverseJoinColumn: {
      name: 'idProducto',
      referencedColumnName: 'idProducto',
    },
  })
  productos_carro: Producto[];
}
