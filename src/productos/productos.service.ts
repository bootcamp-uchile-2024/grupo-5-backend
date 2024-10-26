import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Producto } from "./entities/producto.entity";

@Injectable()
export class ProductoService {

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

async findAll() :Promise<string> {
  const em = this.dataSource.manager;
  const promesaBuscar = em.find(Producto);
  const resultado : Producto[] = await promesaBuscar;
  console.log('Resultado:', resultado);

  return 'Hola desde el servicio de productos';
  }
  
}

