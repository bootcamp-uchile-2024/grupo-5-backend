import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'AVATAR_USUARIOS'})
export class Avatar_usuario {
    @PrimaryColumn()
    idimagenavatar: number;
  
    @Column()
    pathimausuario: string;
}
