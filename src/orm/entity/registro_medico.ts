import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'REGISTROS_MEDICOS'})
export class Registro_Medico {
    @PrimaryColumn({name: 'IDRESGISTROMEDICO'})
    idregistromedico: number;

    @Column({name: 'IDMASCOTA'})
    idmascota: number;

    @Column({name: 'FECHAREGISTRO'})
    fecharegistro: Date;

    @Column({name: 'HORAREGISTRO'})
    horaregistro: string;

    @Column({name: 'MOTIVO'})
    motivo: string;
}
