import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetallesPedidos } from './detallespedidos.entity';
import { ImagenProducto } from './imagenproducto.entity';
import { DetalleCarroCompra } from 'src/detalle-carro-compras/entities/detalle-carro-compra.entity';
import { MarcaProducto } from 'src/marca-producto/entities/marca-producto.entity';
import { CategoriaProducto } from 'src/categoria-producto/entities/categoria-producto.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn({ name: 'idproducto' })
  idProducto: number;

  @Column({ name: 'nombreproducto' })
  nombreProducto: string;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'sku' })
  sku: string;

  @Column({ name: 'precio' })
  precio: number;

  @Column({ name: 'stock' })
  stock: number;

  @Column({ name: 'peso' })
  peso: string;

  @Column({ name: 'tamanio' })
  tamanio: string;

  @Column({ name: 'ingredientes' })
  ingredientes: string;

  @Column({ name: 'material' })
  material: string;

  @Column({ name: 'activo' })
  activo: number;

  @Column({ name: 'descuento' })
  descuento: number;

  @ManyToOne(() => CategoriaProducto)
  @JoinColumn({ name: 'idCategoria' })
  categoria: CategoriaProducto;

  @ManyToOne(() => MarcaProducto)
  @JoinColumn({ name: 'idMarca' })
  marca: MarcaProducto;

  @OneToMany(() => ImagenProducto, (imagen) => imagen.producto)
  imagenes: ImagenProducto[];

  @OneToMany(() => DetalleCarroCompra, (detalle) => detalle.producto)
  detalleCarroCompra: DetalleCarroCompra[];

  @OneToMany(() => DetallesPedidos, (detalle) => detalle.producto)
  detallePedido: DetallesPedidos;
}

