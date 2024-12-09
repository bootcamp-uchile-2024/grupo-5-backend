import { CreateMarcaProductoDto } from "../dto/create-marca-producto.dto";
import { MarcaProducto } from "../entities/marca-producto.entity";

export class MarcaProductoMapper {
    static entityToCreateMarcaDto(entity: MarcaProducto): CreateMarcaProductoDto {
        const dto = new CreateMarcaProductoDto();
        dto.nombreMarca = entity.nombreMarca;
        return dto;
    }
    static dtoCreateMarcaProductoToEntity(dto: CreateMarcaProductoDto) {
        const entity = new MarcaProducto();
        entity.nombreMarca = dto.nombreMarca;
        return entity;
    }
    static entityListToDtoList(entityList: MarcaProducto[]) {
        const dtoList: CreateMarcaProductoDto[] = [];
        entityList.forEach((entity: MarcaProducto) => {
            dtoList.push(this.entityToCreateMarcaDto(entity));
        });
        return dtoList;
    }
}