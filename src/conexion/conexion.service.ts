import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { waitForDebugger } from 'inspector';
import { CatalogoProductoDto } from 'src/productos/dto/read-catalogo-productos.dto';

// import { ProductoDto } from 'src/mascotas/dto/producto.dto';



@Injectable()

export class ConexionService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async obtenerProductos() : Promise<CatalogoProductoDto[]> {
    const listaProductos : CatalogoProductoDto[] = [];
    const instruccion = "SELECT IDPRODUCTO, NOMBREPRODUCTO FROM PRODUCTOS;";
    const resultado : any[] = await this.dataSource.query(instruccion);
    for (const fila of resultado) {
      const dto= new CatalogoProductoDto();
      dto.sku = fila.IDPRODUCTO,
      dto.NombreProducto = fila.NOMBREPRODUCTO
      listaProductos.push(dto);
    }
    return listaProductos;

  }







}