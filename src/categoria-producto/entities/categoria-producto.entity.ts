import { Producto } from 'src/productos/entities/producto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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
