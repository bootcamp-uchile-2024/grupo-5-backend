import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'MASCOTAS' })
export class Mascota {
    @PrimaryGeneratedColumn()
    idmascota: number;
  
    @Column()
    nombre: string;
  
    @Column()
    fechanacimiento: Date;
  
    @Column()
    sexo: string;
  
    @Column()
    numerochip: string;
  
  }