
import { CreateCarroCompraDto } from "../dto/create-carroCompra.dto";
import { CarroCompras } from "../entities/carroCompra.entity";

export class carroCompraMapper{
    static entityToCarroCompraDto(entity: CarroCompras): CreateCarroCompraDto{
        const dto = new CreateCarroCompraDto();
        dto.idCarroCompras = entity.idCarroCompras;
        dto.idUsuario = entity.idUsuario;  
        dto.fechaCreacion = entity.fechaCreacion;
        dto.precioTotal = entity.precioTotal;
        dto.detallesCarro = entity.detallesCarro;
        return dto;
    }

    static dtoToCreateCarroCompraDtoEntity(dto: CreateCarroCompraDto): CarroCompras{
        const entity = new CarroCompras();
        entity.idCarroCompras  = dto.idCarroCompras ;
        entity.idUsuario = dto.idUsuario;
        entity.fechaCreacion = dto.fechaCreacion;
        entity.precioTotal = dto.precioTotal;
        entity.detallesCarro = dto.detallesCarro;
        return entity;
    }

    static entituListoToDtoList(entityList: CarroCompras[]): CreateCarroCompraDto[]{
        const dtoList: CreateCarroCompraDto[] = [];
        entityList.forEach((entity) => {
            dtoList.push(this.entityToCarroCompraDto(entity));
        });
        return dtoList;
    }
}