import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@Entity('marca_producto')
export class MarcaProducto {
  @PrimaryColumn()
  idMarca: number;  

  @Column()
  nombreMarca: string;

  @ManyToOne(() => Producto)
  @JoinColumn({name: 'Producto'})
  producto: Producto;

}