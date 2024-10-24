import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'CATEGORIAS_PRODUCTO'})
export class Categoria_producto {
  @PrimaryColumn({name: 'idcategoria'})
  idcategoria: number;

  @Column({name: 'nombrecategoria'})
  nombrecategoria: string;

  @Column({name: 'descripcioncategoria'})
  descripcioncategoria: string;
}
