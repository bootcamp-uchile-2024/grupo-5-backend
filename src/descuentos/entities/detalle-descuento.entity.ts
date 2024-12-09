import { CategoriaProducto } from 'src/categoria-producto/entities/categoria-producto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Descuento } from './descuento.entity';

@Entity('detalle_descuento')
export class DetalleDescuento {
  @PrimaryGeneratedColumn({ name: 'iddetalledescuento' })
  idDetalleDescuento: number;

  @Column({ name: 'iddescuento' })
  idDescuento: number;

  @Column({
    name: 'idcategoria',
    nullable: true,
  })
  idCategoria: number;

  @Column({
    name: 'idmarca',
    nullable: true,
  })
  idMarca: number;

  @Column({
    name: 'idproducto',
    nullable: true,
  })
  idProducto: number;

  @ManyToOne(() => Descuento)
  @JoinColumn({ name: 'idDescuento' })
  descuento: Descuento;
}


