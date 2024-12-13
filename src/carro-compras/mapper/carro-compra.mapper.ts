
import { CreateCarroCompraDto } from "../dto/create-carro-compra.dto";
import { CarroCompra } from "../entities/carro-compra.entity";

export class carroCompraMapper{
    static entityToCreateCarroCompraDto(entity: CarroCompra): CreateCarroCompraDto{
        const dto = new CreateCarroCompraDto();
        dto.idUsuario = entity.idUsuario;
        dto.fechaCreacion = entity.fechaCreacion;
        return dto;
    }

    static dtoToCarroCompraEntity(dto: CreateCarroCompraDto): CarroCompra{
        const entity = new CarroCompra();
        entity.idUsuario = dto.idUsuario;
        entity.fechaCreacion = dto.fechaCreacion;
        return entity;
    }

    static entityListoToDtoList(entityList: CarroCompra[]): CreateCarroCompraDto[]{
        const dtoList: CreateCarroCompraDto[] = [];
        entityList.forEach((entity: CarroCompra) => {
            dtoList.push(this.entityToCreateCarroCompraDto(entity));
        });
        return dtoList;
    }
}