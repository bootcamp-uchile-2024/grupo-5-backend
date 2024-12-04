// imagen-producto.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('imagenes_productos')
export class ImagenProducto {
  @PrimaryGeneratedColumn({name: 'idimagen'})
  idImagen: number;

  @Column({name: 'pathimaproductos'})
  pathImagenProducto: string;
  
  // @ManyToOne(() => Producto)
  // @JoinColumn({name: 'IdProducto'})
  // idProducto: Producto;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'idProducto' })
  producto: Producto;
}