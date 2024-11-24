import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { DetalleCarroCompra } from './detalleCarroCompra.entity';

@Entity('carro_compras')
export class CarroCompras {
  @PrimaryColumn({ name: 'idcarrocompras' })
  idCarroCompras: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuario' })
  idUsuario: number;

  @Column({ name: 'fechacreacion' })
  fechaCreacion: Date;

  @Column({ name: 'preciototal' })
  precioTotal: number;


  @OneToMany(() => DetalleCarroCompra, (dc) => dc.carroCompras)
  detallesCarro: DetalleCarroCompra[];

}
