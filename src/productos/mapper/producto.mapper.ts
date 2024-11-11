import { CreateProductoDto } from "../dto/create-producto.dto";
import { GetProductoDto } from "../dto/read-producto.dto";
import { Producto } from "../entities/producto.entity";

export class ProductoMapper {

  static dtoToEntity(dto: CreateProductoDto): Producto {
    const entity = new Producto();
    entity.idMarca = dto.idMarca;
    entity.idCategoria = dto.idCategoria;
    entity.nombreProducto = dto.nombreProducto;
    entity.descripcion = dto.descripcion;
    entity.sku = dto.sku;
    entity.precio = dto.precio;
    entity.stock = dto.stock;
    entity.peso = dto.peso;
    entity.tamanio = dto.tamanio;
    entity.ingredientes = dto.ingredientes;
    entity.imagenes = dto.imagenes;
    entity.material = dto.material;
    return entity;
  }

  static entityToDto(entity: Producto): GetProductoDto {
    const dto = new GetProductoDto();
    dto.idMarca = entity.idMarca;
    dto.idCategoria = entity.idCategoria;
    dto.nombreProducto = entity.nombreProducto;
    dto.descripcion = entity.descripcion;
    dto.sku = entity.sku;
    dto.precio = entity.precio;
    dto.stock = entity.stock;
    dto.peso = entity.peso;
    dto.tamanio = entity.tamanio;
    dto.ingredientes = entity.ingredientes;
    dto.imagenes = entity.imagenes;
    dto.material = entity.material;
    return dto;
  }

  static entityListToDtoList(entityList: Producto[]): GetProductoDto[] {
    return entityList.map((entity) => ProductoMapper.entityToDto(entity));

}

}

