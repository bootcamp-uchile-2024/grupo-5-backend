// presentacion-producto.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('PRESENTACIONES_PRODUCTO')
export class PresentacionProducto {
  @PrimaryColumn({ name: 'IdPresentacion' })
  idPresentacion: number;

  @Column({name : 'sku'})
  sku: number;

  @Column({name : 'precio'})
  precio: number;

  @Column({name : 'stock'})
  stock: number;

  @Column({name : 'peso'})
  peso: number;

  @Column({name : 'tamanio'})
  tamanio: number;
  
  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'IdProducto' })
  producto: Producto;

}
