import { CatalogoProductoDto } from "../dto/read-catalogo-productos.dto";
import { GetProductoDto } from "../dto/read-producto.dto";
import { Producto } from "../entities/producto.entity";

export class ProductoMapper {
  static entityToCatalogoDto(entity: Producto): CatalogoProductoDto {
    const dto = new CatalogoProductoDto();
    dto.id = entity.idProducto;
    dto.sku = entity.sku;
    dto.NombreProducto = entity.nombreProducto;
    dto.MarcaProducto = entity.marca ? entity.marca.nombreMarca : null;  // Ajustado para obtener el nombre de la marca
    dto.PrecioProducto = entity.precio;
    dto.stock = entity.stock;
    dto.ImagenesProducto = entity.imagenes; 
    return dto;
  }

  static entityListToCatalogoDtoList(entityList: Producto[]): CatalogoProductoDto[] {
    return entityList.map((entity) => ProductoMapper.entityToCatalogoDto(entity));
  }


  static entityToGetProductoDto(entity: Producto): GetProductoDto {
    const dto = new GetProductoDto();
    dto.id = entity.idProducto;
    dto.sku = entity.sku;
    dto.nombreProducto = entity.nombreProducto;
    dto.marca = entity.marca.nombreMarca;  // Ajustado para obtener el nombre de la marca
    dto.descripcion = entity.descripcion;
    dto.precio = entity.precio;
    dto.stock = entity.stock;
    dto.peso = entity.peso; 
    dto.tamanio = entity.tamanio;
    dto.ingredientes = entity.ingredientes;
    dto.material = entity.material;
    dto.imagenes = entity.imagenes;
    dto.categoria = entity.categoria.nombreCategoria;
    return dto;
  }
    static entityListToGetProductoDtoList(entityList: Producto[]): GetProductoDto[] {
      return entityList.map((entity) => ProductoMapper.entityToGetProductoDto(entity));
  }


}
