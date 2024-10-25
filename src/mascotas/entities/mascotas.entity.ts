import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Raza } from './razas.entity';
import { AvatarMascota } from './avatarmascotas.entity';
import { RegistroMedico } from './registromedico.entity';
import { Calendario } from './calendarios.entity';
import { MascotasCondiciones } from './mascotascondiciones.entity';
import { MascotasVacunas } from './mascotasvacunas.entity_DELETE';
import { UsuariosMascotas } from 'src/usuarios/entities/usuariomascotas.entity';

@Entity('mascotas')
export class Mascota {
    @PrimaryColumn()
    idMascota: number;

    @Column()
    nombre: string;

    @Column()
    fechaNacimiento: Date;

    @Column()
    sexo: string;

    @Column()
    numeroChip: string;

    @OneToMany(() => RegistroMedico, (registroMedico) => registroMedico.mascota)
    registrosMedicos: RegistroMedico[];

    @ManyToOne(() => Raza, (raza) => raza.mascotas)
    @JoinColumn({ name: 'idRaza' })
    raza: Raza;

    @ManyToOne(() => AvatarMascota, (avatarMascota) => avatarMascota.idAvatarMascota)
    @JoinColumn({ name: 'idAvatarMascota' })
    avatarMascota: AvatarMascota;

    @OneToMany(() => Calendario, (calendario) => calendario.motivocalendario)
    calendarios: Calendario[];

    @OneToMany(() => MascotasCondiciones, (mascotasCondiciones) => mascotasCondiciones.mascota)
    condiciones: MascotasCondiciones[];

    @OneToMany(() => MascotasVacunas, (mascotasVacunas) => mascotasVacunas.mascota)
    vacunas: MascotasVacunas[];

    @OneToMany(() => UsuariosMascotas, (usuariosMascotas) => usuariosMascotas.mascota)
    usuarios: UsuariosMascotas[];
}
