import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { CarroCompras } from "./carroCompra.entity";

@Entity('detalles_carro_compra')
export class DetalleCarroCompra {

  @PrimaryColumn({ name: 'iddetallecarro' })
  idDetalleCarro: number;

  @Column({ name: 'idcarrocompras' })
  idCarroCompras: number;

  @Column({ name: 'cantidad' })
  cantiadad: number;

  @Column({ name: 'preciounitario' })
  precioUnitario: number;   
  
  @ManyToOne(() => CarroCompras)
  @JoinColumn({ name: 'idPedido' })
  CarroCompras: CarroCompras;
  
  @ManyToMany(() => Producto)
  @JoinTable({
    name: 'PRODUCTOS_CARRO',
    joinColumn: {
      name: 'idDetalleCarro',
      referencedColumnName: 'idDetalleCarro',
    },
    inverseJoinColumn: {
      name: 'idProducto',
      referencedColumnName: 'idProducto',
    },
  })
  productos: Producto[];
}
