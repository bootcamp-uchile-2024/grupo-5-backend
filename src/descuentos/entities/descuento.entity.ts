import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleDescuento } from "./detalle-descuento.entity";

@Entity('descuentos')
export class Descuento {

    @PrimaryGeneratedColumn({ name: 'iddescuento' })
    idDescuento: number;
    
    @Column({ name: 'nombredescuento' })
    nombreDescuento: string;

    @Column({ name: 'descripciondescuento' })
    descripcionDescuento: string;

    @Column({ name: 'porcentaje' })
    porcentajeDescuento: number;

    @Column({ name: 'fechainicio' })
    fechaInicio: Date;

    @Column({ name: 'fechafin' })
    fechaFin: Date;

    @Column({ name: 'estado' })
    estado: number;

    @OneToMany(() => DetalleDescuento, (dc) => dc.descuento)
    detalleDescuentos: DetalleDescuento[];

}

