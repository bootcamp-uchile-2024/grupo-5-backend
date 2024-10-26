// presentacion-producto.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('presentacion_producto')
export class PresentacionProducto {
  @PrimaryGeneratedColumn()
  idPresentacion: number;

  @Column()
  precio: number;

  @Column()
  stock: number;

  @Column()
  peso: number;

  @Column()
  tamanio: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'idProducto' })
  producto: Producto;
}
