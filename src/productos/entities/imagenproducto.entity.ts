// imagen-producto.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('imagenes_producto')
export class ImagenProducto {
  @PrimaryGeneratedColumn()
  idImagen: number;

  @Column()
  pathImagenProducto: string;
  
  @ManyToOne(() => Producto)
  @JoinColumn({name: 'Producto'})
  producto: Producto;
}