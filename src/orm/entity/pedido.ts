import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'PEDIDOS' })
export class Pedido {
    @PrimaryGeneratedColumn()
    idpedido: number;
  
    @Column()
    fechacreacion: Date;
  
    @Column()
    fechaentrega: Date;
  
  }