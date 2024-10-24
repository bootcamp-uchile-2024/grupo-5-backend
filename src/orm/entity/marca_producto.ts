import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'MARCAS_PRODUCTO'})
export class Marca_producto {
  @PrimaryColumn({name: 'idmarca'})
  idmarca: number;

  @Column({name: 'nombremarca'})
  nombremarca: string;
}