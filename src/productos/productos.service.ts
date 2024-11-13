import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Producto } from "./entities/producto.entity";
import { ProductoMapper } from "./mapper/producto.mapper";
import { CatalogoProductoDto } from "./dto/read-catalogo-productos.dto";
import { GetProductoDto } from "./dto/read-producto.dto";


@Injectable()
export class ProductoService {

  constructor(
    @InjectRepository(Producto)  private productoRepository: Repository<Producto>,
  ) {}

  async catalogoProductos(): Promise<CatalogoProductoDto[]> {
    const productos = await this.productoRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.marca', 'mp')  
      .leftJoinAndSelect('p.categoria', 'cp') 
      .leftJoinAndSelect('p.imagenes', 'img')  
      .select([
        'p.idProducto', 
        'mp.nombreMarca', 
        'cp.nombreCategoria',  
        'cp.descripcionCategoria',  
        'p.nombreProducto',
        'p.descripcion',
        'p.precio',
        'p.peso',
        'p.tamanio',
        'p.ingredientes',
        'p.material',
        'img.pathImagenProducto', 
      ])
      .getMany();

      //console.log(productos);

    return ProductoMapper.entityListToCatalogoDtoList(productos);
}

async catalogoProductosPag(nroPagina: number, cantidadPorPagina: number): Promise<GetProductoDto[]> {
  const nroPaginaValido = nroPagina - 1;
  const offset = cantidadPorPagina * nroPaginaValido;
  const totalRegistros : number = await this.productoRepository.count ();

   // Si no hay productos, lanzar excepción
   if (totalRegistros === 0) {
    throw new NotFoundException('No se encontraron productos.');
  }

  const productos = await this.productoRepository
    .createQueryBuilder('p')
    .leftJoinAndSelect('p.marca', 'mp')  
    .leftJoinAndSelect('p.categoria', 'cp') 
    .leftJoinAndSelect('p.imagenes', 'img')  
    .select([
      'p.idProducto', 
      'mp.nombreMarca', 
      'cp.nombreCategoria',  
      'cp.descripcionCategoria',  
      'p.nombreProducto',
      'p.descripcion',
      'p.precio',
      'p.peso',
      'p.tamanio',
      'p.ingredientes',
      'p.material',
      'img.pathImagenProducto', 
    ])
    .orderBy('p.idProducto', 'ASC')
    .addOrderBy('p.precio', 'DESC')
    .take(cantidadPorPagina)
    .skip(offset)
    .getMany();

    //console.log(productos);

  return ProductoMapper.entityListToGetProductoDtoList(productos);
}
async DetalleProducto(id: number): Promise<GetProductoDto[]> {
  const productosDet = await this.productoRepository
    .createQueryBuilder('p')
    .leftJoinAndSelect('p.marca', 'mp')  
    .leftJoinAndSelect('p.categoria', 'cp') 
    .leftJoinAndSelect('p.imagenes', 'img')
    .where('p.idProducto = :id', { id }) 
    .select([
      'p.idProducto', 
      'p.nombreProducto',
      'mp.nombreMarca', 
      'p.descripcion',
      'p.sku',
      'p.precio',
      'p.stock',
      'p.peso',
      'p.tamanio',
      'p.ingredientes',
      'img.pathImagenProducto', 
      'p.material',
      'cp.nombreCategoria',   
    ])
      .getMany();

    //console.log(productosDet);

  return ProductoMapper.entityListToGetProductoDtoList(productosDet);
}


}
