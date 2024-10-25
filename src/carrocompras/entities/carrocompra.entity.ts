import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';

@Entity('carro_compras')
export class CarroCompras {
  @PrimaryColumn()
  idCarroCompras: number;

  @Column()
  idUsuario: number;

  @Column()
  fechaCreacion: Date;

  //VALIDAR
  @ManyToOne(() => Usuario/*, (usuario) => usuario.idUsuario*/)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;
}
