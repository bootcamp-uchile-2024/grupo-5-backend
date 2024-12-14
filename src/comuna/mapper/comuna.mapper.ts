import { Region } from "src/region/entities/region.entity";
import { UpdateComunaDto } from "../dto/update-comuna.dto";
import { Comuna } from "../entities/comuna.entity";
import { CreateComunaDto } from "../dto/create-comuna.dto";

export class comunaMapper {

    static entityToCreateComunaDto(entity: Comuna): CreateComunaDto {
        const dto = new CreateComunaDto();
        dto.idComuna = entity.idComuna;
        dto.idRegion = entity.region.idRegion;
        dto.nombreComuna = entity.nombreComuna;
        return dto;
    }

    static dtoCreateToComunaEntity(dto: CreateComunaDto): Comuna {
        const entity = new Comuna();

        const region = new Region();
        region.idRegion = dto.idRegion;

        entity.idComuna = dto.idComuna;
        entity.region = region;
        entity.nombreComuna = dto.nombreComuna;
        return entity;
    }


    static entitytoUpdateComunaDto(entity: Comuna): UpdateComunaDto {
        const dto = new UpdateComunaDto();
        dto.idRegion = entity.region.idRegion;        
        dto.nombreComuna = entity.nombreComuna;
        return dto;
    }

    static dtoUpdateToComunaEntity(dto: UpdateComunaDto): Comuna {
        const entity = new Comuna();

        const region = new Region();
        region.idRegion = dto.idRegion;

        entity.region = region;
        entity.nombreComuna = dto.nombreComuna;
        return entity;
    }

    


    static entityListToDtoList(entityList: Comuna[]): UpdateComunaDto[] {
        const dtoList: UpdateComunaDto[] = [];
        entityList.forEach((entity: Comuna) => {
            dtoList.push(this.entitytoUpdateComunaDto(entity));
        });
        return dtoList;
    }
}