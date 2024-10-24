import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'AVATAR_MASCOTAS'})
export class Avatar_mascota {
    @PrimaryColumn({name: 'IDAVATARMASCOTA'})
    idavatarmascota: number;

    @Column({name: 'PATHIMAMASCOTA'})
    pathimamascota: string;
}
