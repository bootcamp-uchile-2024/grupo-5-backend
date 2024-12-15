
import { Usuario } from "src/usuarios/entities/usuarios.entity";
import { CreateCarroCompraDto } from "../dto/create-carro-compra.dto";
import { ReadCarroComprasDto } from "../dto/read-carro-compra.dto";
import { CarroCompra } from "../entities/carro-compra.entity";

export class CarroCompraMapper{
    static entityToCreateCarroCompraDto(entity: CarroCompra): CreateCarroCompraDto{
        const dto = new CreateCarroCompraDto();
        dto.idUsuario = entity.usuario.idUsuario;
        return dto;
    }

    static dtoToCarroCompraEntity(dto: CreateCarroCompraDto): CarroCompra{
        const entity = new CarroCompra();
        const usuario = new Usuario();
        usuario.idUsuario = dto.idUsuario;

        entity.usuario = usuario;
        return entity;
    }


    static entityToReadCarroCompraDto(entity: CarroCompra, PrecioTotal: number): ReadCarroComprasDto{
        const dto = new ReadCarroComprasDto();

        dto.idCarroCompra = entity.idCarroCompra;
        dto.idUsuario = entity.usuario.idUsuario;
        dto.detalleCarro = entity.detallesCarro;
        dto.precioTotal = PrecioTotal;
        return dto;
    }

    static entityListoToDtoList(entityList: CarroCompra[]): CreateCarroCompraDto[]{
        const dtoList: CreateCarroCompraDto[] = [];
        entityList.forEach((entity: CarroCompra) => {
            dtoList.push(this.entityToCreateCarroCompraDto(entity));
        });
        return dtoList;
    }
}