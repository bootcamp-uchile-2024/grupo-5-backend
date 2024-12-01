import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@Entity('categorias_producto')
export class CategoriaProducto {
  @PrimaryGeneratedColumn({ name: 'idcategoria' })
  idCategoria: number;  

  @Column({ name: 'nombrecategoria' })
  nombreCategoria: string;

  @Column({ name: 'descripcioncategoria' })
  descripcionCategoria: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];  
}
