import { Producto } from 'src/productos/entities/producto.entity';
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity('marcas_producto')
export class MarcaProducto {
  @PrimaryColumn( {name: 'idmarca'})
  idMarca: number;  

  @Column({name: 'nombremarca'})
  nombreMarca: string;

  @OneToMany(() => Producto, producto => producto.marca)
  productos: Producto[];
  
}