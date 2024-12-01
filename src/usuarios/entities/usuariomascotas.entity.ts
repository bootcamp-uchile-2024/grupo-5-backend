import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuarios.entity'; 
import { Mascota } from 'src/mascotas/entities/mascotas.entity';


@Entity('USUARIOS_MASCOTAS')
export class UsuariosMascotas {
    @PrimaryColumn()
    idUsuario: bigint;

    @PrimaryColumn()
    idMascota: bigint;

    @ManyToOne(() => Usuario, (usuario) => usuario.mascotas)
    @JoinColumn({ name: 'idUsuario' }) // Referencia a la columna en la base de datos
    usuario: Usuario;

    @ManyToOne(() => Mascota, (mascota) => mascota.usuarios)
    @JoinColumn({ name: 'idMascota' }) // Referencia a la columna en la base de datos
    mascota: Mascota;
}
