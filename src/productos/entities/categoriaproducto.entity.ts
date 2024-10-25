import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@Entity('categoria_producto')
export class CategoriaProducto {
  @PrimaryGeneratedColumn()
  idCategoria: number;  

  @Column()
  nombreCategoria: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];  
}
