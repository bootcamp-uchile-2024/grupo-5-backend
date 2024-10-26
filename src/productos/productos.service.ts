import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CatalogoProductoDto } from "./dto/read-catalogo-productos.dto";
import { Producto } from "./entities/producto.entity";

@Injectable()
export class ProductoService {

  constructor(
    @InjectRepository(Producto) private productoRepository: Repository<Producto>
  ) {}

async findAll(): Promise<CatalogoProductoDto[]> {
  // Recuperar todos los productos de la base de datos, incluyendo relaciones necesarias
  const catalogo: Producto[] = await this.productoRepository.find({
    relations: ['marca', 'presentaciones', 'imagenes'], // Asegúrate de incluir las relaciones
  });

  // Mapear los productos a DTO
  const dtoCatalogo: CatalogoProductoDto[] = catalogo.flatMap(producto => {
    // Para cada producto, mapeamos a CatalogoProductoDto
    return producto.presentaciones.map((presentacion, index) => {
      const dtoCatalogo = new CatalogoProductoDto();

      // Asignar las propiedades desde el producto y su presentación a la instancia del DTO
      dtoCatalogo.sku = presentacion.sku; 
      dtoCatalogo.NombreProducto = producto.nombreProducto; 
      dtoCatalogo.MarcaProducto = producto.marca ? producto.marca.nombreMarca : 'Marca no disponible'; 
      dtoCatalogo.PrecioProducto = presentacion.precio; 
      dtoCatalogo.ImagenesProducto = producto.imagenes.map(imagen => imagen.pathImagenProducto); 

      return dtoCatalogo;
    });
  });

  return dtoCatalogo;
}



}
