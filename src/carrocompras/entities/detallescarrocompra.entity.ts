import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarroCompras } from './carrocompra.entity';

@Entity('detalles_carro_compra')
export class DetalleCarroCompra {
  @PrimaryGeneratedColumn()
  idDetalleCarro: number;

  @Column({ type: 'int' })
  idProducto: number; // Agrega esta propiedad

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @ManyToOne(() => CarroCompras, (carroCompra) => carroCompra.detalleCarroCompra)
  @JoinColumn({ name: 'idCarroCompras' })
  carroCompra: CarroCompras;
}
