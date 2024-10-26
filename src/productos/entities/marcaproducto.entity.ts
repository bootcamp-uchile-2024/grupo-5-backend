import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@Entity('marcas_producto')
export class MarcaProducto {
  @PrimaryColumn()
  idMarca: number;  

  @Column()
  nombreMarca: string;

  @OneToMany(() => Producto, producto => producto.marca)
  productos: Producto[];
  
}