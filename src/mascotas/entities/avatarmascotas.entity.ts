import { Entity, PrimaryColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Mascota } from './mascotas.entity'; 

@Entity('avatar_mascotas')
export class AvatarMascota {
    @PrimaryColumn({name: 'idavatarmascota'})
    idAvatarMascota: number;

    @Column({name: 'pathimamascota'})
    pathImagenMascota: string;

    @OneToMany(() => Mascota, (mascota) => mascota.avatarMascota)
    mascotas: Mascota[];
}
