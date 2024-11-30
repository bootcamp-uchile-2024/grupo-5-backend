
import { CreateCarroCompraDto } from "../dto/create-carro-compra.dto";
import { CarroCompra } from "../entities/carro-compra.entity";

export class carroCompraMapper{
    static entityToCreateCarroCompraDto(entity: CarroCompra): CreateCarroCompraDto{
        const dto = new CreateCarroCompraDto();
        // dto.idCarroCompras = entity.idCarroCompras;
        //dto.idUsuario = entity.idUsuario;  
        dto.fechaCreacion = entity.fechaCreacion;
        dto.precioTotal = entity.precioTotal;
        dto.detallesCarro = entity.detallesCarro;
        return dto;
    }

    static dtoToCarroCompraEntity(dto: CreateCarroCompraDto): CarroCompra{
        const entity = new CarroCompra();
        // entity.idCarroCompras  = dto.idCarroCompras ;
       // entity.idUsuario = dto.idUsuario;
        entity.fechaCreacion = dto.fechaCreacion;
        entity.precioTotal = dto.precioTotal;
        entity.detallesCarro = dto.detallesCarro;
        return entity;
    }

    static entityListoToDtoList(entityList: CarroCompra[]): CreateCarroCompraDto[]{
        const dtoList: CreateCarroCompraDto[] = [];
        entityList.forEach((entity) => {
            dtoList.push(this.entityToCreateCarroCompraDto(entity));
        });
        return dtoList;
    }
}