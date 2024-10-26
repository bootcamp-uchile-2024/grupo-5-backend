// imagen-producto.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('imagenes_productos')
export class ImagenProducto {
  @PrimaryColumn()
  idImagen: number;

  @Column({name: 'PATHIMAPRODUCTOS'})
  pathImagenProducto: string;
  
  // @ManyToOne(() => Producto)
  // @JoinColumn({name: 'IdProducto'})
  // idProducto: Producto;

  @ManyToOne(() => Producto, (producto) => producto.imagenes)
  @JoinColumn({ name: 'IdProducto' })
  producto: Producto;
}