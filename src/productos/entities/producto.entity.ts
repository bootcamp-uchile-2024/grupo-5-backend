import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaProducto } from "./categoriaproducto.entity";
import { MarcaProducto } from "./marcaproducto.entity";
import { ImagenProducto } from "./imagenproducto.entity";
import { CarroCompras } from "src/carrocompras/entities/carrocompra.entity";
import { Pedido } from "./pedidos.entity";

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn({ name: 'idproducto' })
  idProducto: number;

  @PrimaryColumn({ name: 'idmarca' })
  idMarca: number;

  @PrimaryColumn({ name: 'idcategoria' })
  idCategoria: number;

  @Column({ name:'nombreproducto' })
  nombreProducto: string;

  @Column({ name:'descripcion' })
  descripcion: string;

  @Column({ name:'sku' })
  sku: string;

  @Column({ name:'precio' })
  precio: number;

  @Column({ name:'stock' })
  stock: number;

  @Column({ name: 'peso' })
  peso: string;

  @Column({ name:'tamanio' })
  tamanio: string;

  @Column({ name: 'ingredientes' })
  ingredientes: string;

  @Column({ name: 'material' })
  material: string;

  @ManyToOne(() => CategoriaProducto)
  @JoinColumn({name: 'idCategoria'})
  categoria: CategoriaProducto;

  @ManyToOne(() => MarcaProducto)
  @JoinColumn({name: 'idMarca'})
  marca: MarcaProducto;

  @OneToMany(() => ImagenProducto, (imagen) => imagen.producto)
  imagenes: ImagenProducto[];
  
  @ManyToMany(() => CarroCompras, (carro) => carro.productos_carro)
  carroCompras: CarroCompras[];

  @ManyToMany(() => Pedido, (pedido) => pedido.productos_pedido)
  pedidos: Pedido[];

}
