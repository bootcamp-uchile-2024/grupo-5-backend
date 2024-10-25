import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { CategoriaProducto } from './categoriaproducto.entity';
import { MarcaProducto } from './marcaproducto.entity';

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
  sku: string;

  @Column()
  descripcion: string;


  @ManyToOne(() => CategoriaProducto, (categoria) => categoria.productos)
  categoria: CategoriaProducto;
  //VERIFICAR
  @ManyToOne(() => MarcaProducto, (marca) => marca.nombreMarca)
  marca: MarcaProducto;


}
