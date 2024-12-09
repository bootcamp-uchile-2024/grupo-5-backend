import { CreateDescuentoDto } from "../dto/create-descuento.dto";
import { Descuento } from "../entities/descuento.entity";

export class DescuentoMapper {
    static entityToCreateDescuentoDto(entity: Descuento): CreateDescuentoDto {
        const dto = new CreateDescuentoDto();

        dto.nombreDescuento = entity.nombreDescuento;
        dto.descripcionDescuento = entity.descripcionDescuento;
        dto.porcentajeDescuento = entity.porcentajeDescuento;
        dto.fechaInicio = entity.fechaInicio;
        dto.fechaFin = entity.fechaFin;
        dto.estado = entity.estado;
        return dto;
    }
    static dtoCreateDescuentoToEntity(dto: CreateDescuentoDto): Descuento {
        const entity = new Descuento();

        entity.nombreDescuento = dto.nombreDescuento;
        entity.descripcionDescuento = dto.descripcionDescuento;
        entity.porcentajeDescuento = dto.porcentajeDescuento;
        entity.fechaInicio = dto.fechaInicio;
        entity.fechaFin = dto.fechaFin;
        entity.estado = dto.estado;
        return entity;
    }

    static entityListToDtoList(entityList: Descuento[]) {
        const dtoList = [];
        entityList.forEach((entity) => {
            dtoList.push(this.entityToCreateDescuentoDto(entity));
        });
        return dtoList;
    }
}