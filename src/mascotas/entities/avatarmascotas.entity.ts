import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
import { Mascota } from './mascotas.entity'; 

@Entity('avatar_mascotas')
export class AvatarMascota {
    @PrimaryColumn()
    idAvatarMascota: number;

    @Column()
    pathImagenMascota: string;

    @OneToOne(() => Mascota, (mascota) => mascota.avatarMascota)
    mascota: Mascota;
}
