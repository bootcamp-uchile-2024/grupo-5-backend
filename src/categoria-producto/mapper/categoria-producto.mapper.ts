import { CreateCategoriaProductoDto } from "../dto/create-categoria-producto.dto";
import { UpdateCategoriaProductoDto } from "../dto/update-categoria-producto.dto";
import { CategoriaProducto } from "../entities/categoria-producto.entity";

export class CategoriaProductoMapper {
    static entityToCreateCategoriaDto(entity: CategoriaProducto): CreateCategoriaProductoDto {
        const dto = new CreateCategoriaProductoDto();
        dto.nombreCategoria = entity.nombreCategoria;
        dto.descripcionCategoria = entity.descripcionCategoria;
        return dto;
    }

    static dtoCreateCategoriaProductoToEntity(dto: CreateCategoriaProductoDto) {
        const entity = new CategoriaProducto();
        entity.nombreCategoria = dto.nombreCategoria;
        entity.descripcionCategoria = dto.descripcionCategoria;
        return entity;
    }

    static dtoUpdateCategoriaProductoToEntity(dto: UpdateCategoriaProductoDto) {
        const entity = new CategoriaProducto();
        entity.idCategoria = dto.idCategoria;
        entity.nombreCategoria = dto.nombreCategoria;
        entity.descripcionCategoria = dto.descripcionCategoria;
        return entity;
    }

    static entityListToDtoList(entityList: CategoriaProducto[]) {
        const dtoList = [];
        entityList.forEach((entity: CategoriaProducto) => {
            dtoList.push(this.entityToCreateCategoriaDto(entity));
        });
        return dtoList;
    }
}