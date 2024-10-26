import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { Raza } from './razas.entity';
import { AvatarMascota } from './avatarmascotas.entity';
import { RegistroMedico } from './registromedico.entity';
import { Calendario } from './calendarios.entity';
import { CondicionAlimentaria } from './condicionesalimentarias.entity';
import { Vacuna } from './vacunas.entity';
import { Enfermedad_Base } from './enfermedadesbase.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';

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

    @ManyToOne(() => Raza)
    @JoinColumn({ name: 'idRaza' })
    raza: Raza;

    @OneToOne(() => AvatarMascota)
    @JoinColumn({ name: 'idAvatarMascota' })
    avatarMascota: AvatarMascota;

    @OneToMany(() => Calendario, (calendario) => calendario.idMascota)
    calendarios: Calendario[];

    @ManyToMany(() => CondicionAlimentaria)
    @JoinTable({name: 'Mascotas_Condalimentarias',
        joinColumn: {name: 'idMascota', referencedColumnName: 'idMascota'},
        inverseJoinColumn: {name: 'idCondicion', referencedColumnName: 'idCondicion'},
    })
    condicionesAlimentarias: CondicionAlimentaria[];

    @ManyToMany(() => Vacuna)
    @JoinTable({name: 'Mascotas_Vacunas',
        joinColumn: {name: 'idMascota', referencedColumnName: 'idMascota'},
        inverseJoinColumn: {name: 'idVacuna', referencedColumnName: 'idVacuna'},
    })
    vacunas: Vacuna[];

    @ManyToMany(() => Enfermedad_Base)
    @JoinTable({name: 'Mascotas_Enfermedades',
        joinColumn: {name: 'idMascota', referencedColumnName: 'idMascota'},
        inverseJoinColumn: {name: 'idEnfermedad', referencedColumnName: 'idEnfermedad'},
    })
    enfermedades: Enfermedad_Base[];

    @ManyToMany(() => Usuario)
    @JoinTable({name: 'Usuarios_Mascotas',
        joinColumn: {name: 'idMascota', referencedColumnName: 'idMascota'},
        inverseJoinColumn: {name: 'idUsuario', referencedColumnName: 'idUsuario'},
    })
    usuarios: Usuario[];

}
