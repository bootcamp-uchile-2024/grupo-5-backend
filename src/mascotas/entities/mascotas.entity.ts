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
    @PrimaryColumn({name: 'idmascota'})
    idMascota: number;

    @Column({name: 'nombre'})
    nombre: string;

    @Column({name: 'fechanacimiento'})
    fechaNacimiento: Date;

    @Column({name: 'sexo'})
    sexo: string;

    @Column({name: 'numerochip'})
    numeroChip: string;

    @OneToMany(() => RegistroMedico, (registroMedico) => registroMedico.mascota)
    registrosMedicos: RegistroMedico[];

    @ManyToOne(() => Raza)
    @JoinColumn({ name: 'idraza' })
    raza: Raza;

    @ManyToOne(() => AvatarMascota)
    @JoinColumn({ name: 'idavatarmascota' })
    avatarMascota: AvatarMascota;

    @OneToMany(() => Calendario, (calendario) => calendario.mascota)
    calendarios: Calendario[];

    @ManyToMany(() => CondicionAlimentaria)
    @JoinTable({name: 'mascotas_condalimentarias',
        joinColumn: {name: 'idMascota', referencedColumnName: 'idMascota'},
        inverseJoinColumn: {name: 'idCondicion', referencedColumnName: 'idCondicion'},
    })
    condicionesAlimentarias: CondicionAlimentaria[];

    @ManyToMany(() => Vacuna)
    @JoinTable({name: 'mascotas_vacunas',
        joinColumn: {name: 'idMascota', referencedColumnName: 'idMascota'},
        inverseJoinColumn: {name: 'idVacuna', referencedColumnName: 'idVacuna'},
    })
    vacunas: Vacuna[];

    @ManyToMany(() => Enfermedad_Base)
    @JoinTable({name: 'mascotas_enfermedades',
        joinColumn: {name: 'idMascota', referencedColumnName: 'idMascota'},
        inverseJoinColumn: {name: 'idEnfermedad', referencedColumnName: 'idEnfermedad'},
    })
    enfermedades: Enfermedad_Base[];

    @ManyToMany(() => Usuario)
    @JoinTable({name: 'usuarios_mascotas',
        joinColumn: {name: 'idMascota', referencedColumnName: 'idMascota'},
        inverseJoinColumn: {name: 'idUsuario', referencedColumnName: 'idUsuario'},
    })
    usuarios: Usuario[];

}
