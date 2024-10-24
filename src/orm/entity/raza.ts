import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'RAZAS' })
export class Raza {
    @PrimaryColumn({ name: 'IDRAZA' })
    idraza: number;

    @Column({ name: 'IDESPECIE' })
    idespecie: number;

    @Column({ name: 'NOMBRERAZA' }) 
    nombreraza: string;
}

