import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { CategoriaProducto } from './categoriaproducto.entity';
import { MarcaProducto } from './marcaproducto.entity';
import { join } from 'path';
import { ImagenProducto } from './imagenproducto.entity';
import { AtributosEspecificos } from './atributosespecificos.entity';
import { PresentacionProducto } from './presentacionproducto.entity';
import { Pedido } from './pedidos.entity';
import { CarroCompras } from 'src/carrocompras/entities/carrocompra.entity';

@Entity('productos') 
export class Producto {
  @PrimaryColumn() // Este debe ser un autoincrementtal
  idProducto: number;

  @Column()
  idMarca: number;

  @Column()
  idCategoria: number;

  @Column()
  nombreProducto: string;

  @Column()
  descripcion: string;

  @ManyToOne(() => CategoriaProducto)
  @JoinColumn({name: 'idCategoria'})
  categoria: CategoriaProducto;

  @ManyToOne(() => MarcaProducto)
  @JoinColumn({name: 'idMarca'})
  marca: MarcaProducto;

  @OneToMany(() => AtributosEspecificos, (atributos) => atributos.idProducto)
  atributos: AtributosEspecificos[];


  // @OneToMany(() => ImagenProducto, (imagen) => imagen.idImagen)
  // imagenes: ImagenProducto[];

  @OneToMany(() => ImagenProducto, (imagen) => imagen.producto)
  imagenes: ImagenProducto[];


  @OneToMany(() => PresentacionProducto, (presentacion) => presentacion.producto)
  presentaciones: PresentacionProducto[];

  
  @ManyToMany(() => CarroCompras, (carro) => carro.productos_carro)
  carroCompras: CarroCompras[];

  @ManyToMany(() => Pedido, (pedido) => pedido.productos_pedido)
  pedidos: Pedido[];

}
