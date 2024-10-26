import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import { DetalleCarroCompra } from './detallescarrocompra.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { join } from 'path';

@Entity('carro_compras')
export class CarroCompras {
  @PrimaryColumn()
  idCarroCompras: number;

  @Column()
  idUsuario: number;

  @Column()
  fechaCreacion: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @OneToMany(() => DetalleCarroCompra, detalleCarroCompra => detalleCarroCompra.carroCompra)
  detalleCarroCompra: DetalleCarroCompra[];

  @ManyToMany(() => Producto)
  @JoinTable({ name: 'PRODUCTOS_CARRO',
    joinColumn: { name: 'idCarroCompras', referencedColumnName: 'idCarroCompras' },
    inverseJoinColumn: { name: 'idProducto', referencedColumnName: 'idProducto' },
  })
  productos_carro: Producto[]; 



}
