import { Usuario } from "src/usuarios/entities/usuarios.entity";
import { CreateDireccionDto } from "../dto/create-direccion.dto";
import { Direccion } from "../entities/direccion.entity";
import { Comuna } from "src/comuna/entities/comuna.entity";
import { ReadDireccionDto } from "../dto/read-direccion.dto";
import { UpdateDireccionDto } from "../dto/update-direccion.dto";

export class direccionMapper{
    static entityToReadDtoDireccion(entity: Direccion): ReadDireccionDto{
        const dto = new ReadDireccionDto();

       
        
        // console.log('Entity Usuario: ', entity.usuario);
        // console.log('Entity Usuario: ', entity.usuario.idUsuario);
        // console.log('Entity: ', entity);
        dto.idDireccion = entity.idDireccion;
        dto.activo = entity.activo; 
        dto.idUsuario = entity.usuario.idUsuario;
        dto.alias = entity.alias;
        dto.calle = entity.calle;
        dto.numero = entity.numero;
        dto.referencias = entity.referencias;
        dto.personaContacto = entity.personaContacto;
        dto.telefonoContacto = entity.telefonoContacto;
        dto.comuna = entity.comuna;
        return dto;
    }

    static dtoCreateDireccionToEntity(dto: CreateDireccionDto): Direccion{
        const entity = new Direccion();
        const usuario = new Usuario();
        usuario.idUsuario = dto.idUsuario;
        const comuna = new Comuna();
        comuna.idComuna = dto.idComuna;

        entity.usuario = usuario;
        entity.comuna = comuna;
        entity.alias = dto.alias;
        entity.calle = dto.calle;
        entity.numero = dto.numero;
        entity.referencias = dto.referencias;
        entity.personaContacto = dto.personaContacto;
        entity.telefonoContacto = dto.telefonoContacto;
        entity.activo = true;
        return entity;
    }

    static dtoUpdateDireccionToEntity(dto: UpdateDireccionDto): Direccion{
        const entity = new Direccion();
        const comuna = new Comuna();
        comuna.idComuna = dto.idComuna;
        

        entity.comuna = comuna;
        entity.alias = dto.alias;
        entity.calle = dto.calle;
        entity.numero = dto.numero;
        entity.referencias = dto.referencias;
        entity.personaContacto = dto.personaContacto;
        entity.telefonoContacto = dto.telefonoContacto;
        entity.activo = true;
        
        return entity;
    }

    static entityListToDtoList(entityList: Direccion[]): ReadDireccionDto[]{
        const dtoList: ReadDireccionDto[] = [];
        entityList.forEach((entity) => {
            dtoList.push(this.entityToReadDtoDireccion(entity));
        });
        return dtoList;
    }
}