import { MarcaProducto } from "src/marca-producto/entities/marca-producto.entity";
import { CreateProductoDto } from "../dto/create-producto.dto";
import { CatalogoProductoDto } from "../dto/read-catalogo-productos.dto";
import { GetProductoDto } from "../dto/read-producto.dto";
import { ActualizarProductoDto } from "../dto/update-producto.dto";
import { Producto } from "../entities/producto.entity";
import { CategoriaProducto } from "src/categoria-producto/entities/categoria-producto.entity";

export class ProductoMapper {

  static entityToCatalogoDto(entity: Producto): CatalogoProductoDto {
    const dto = new CatalogoProductoDto();
    dto.id = entity.idProducto;
    dto.sku = entity.sku;
    dto.nombreProducto = entity.nombreProducto;
    dto.marcaProducto = entity.marca ? entity.marca.nombreMarca : null;  // Ajustado para obtener el nombre de la marca
    dto.precioProducto = entity.precio;
    dto.stockProducto = entity.stock;
    dto.imagenesProducto = entity.imagenes; 
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
    dto.marcaProducto = entity.marca.nombreMarca;  // Ajustado para obtener el nombre de la marca
    dto.descripcionProducto = entity.descripcion;
    dto.precioProducto = entity.precio;
    dto.stockProducto = entity.stock;
    dto.pesoProducto = entity.peso; 
    dto.tamanioProducto = entity.tamanio;
    dto.ingredientesProducto = entity.ingredientes;
    dto.materialProducto = entity.material;
    dto.imagenesProducto = entity.imagenes;
    dto.categoriaProducto = entity.categoria.nombreCategoria;
    dto.activo = entity.activo;
    return dto;
  }
    static entityListToGetProductoDtoList(entityList: Producto[]): GetProductoDto[] {
      return entityList.map((entity) => ProductoMapper.entityToGetProductoDto(entity));
  }


  static DtoToGetProductoEntity(dto: ActualizarProductoDto): Producto {
    const entity = new Producto();
    const marca : MarcaProducto = new MarcaProducto();
    const categoria : CategoriaProducto = new CategoriaProducto();
    marca.idMarca = dto.idMarca;
    categoria.idCategoria = dto.idCategoria;

    entity.nombreProducto = dto.nombreProducto;
    entity.marca= marca;            // Ajustado para obtener el nombre de la marca
    entity.descripcion = dto.descripcion;
    entity.sku = dto.sku;
    entity.precio = dto.precio;
    entity.stock = dto.stock;
    entity.peso = dto.peso; 
    entity.tamanio = dto.tamanio;
    entity.ingredientes = dto.ingredientes;
    entity.material = dto.material;
    entity.imagenes = dto.imagenes;
    entity.categoria = categoria;
    entity.activo = dto.activo;

    return entity;
  }
}