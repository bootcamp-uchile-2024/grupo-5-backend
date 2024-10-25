// atributos-especificos.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('atributos_especificos')
export class AtributosEspecificos {
  @PrimaryColumn()
  idAtributo: number;

  @Column()
  caracteristica: string;

  @Column()
  valor: string;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'IdProducto' })
  idProducto: Producto;

}
