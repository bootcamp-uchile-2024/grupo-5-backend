import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarroCompraDto } from 'src/carro-compras/dto/create-carro-compra.dto';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { CarroCompraMapper } from 'src/carro-compras/mapper/carro-compra.mapper';
import { DetalleCarroComprasService } from 'src/detalle-carro-compras/detalle-carro-compras.service';
import { DetalleCarroCompra } from 'src/detalle-carro-compras/entities/detalle-carro-compra.entity';
import { Repository } from 'typeorm';
import { RegisterClienteDto } from './dto/create-cliente.dto';
import { RegisterInvitadoDto } from './dto/create-invitado.dto';
import { ReadClienteDto } from './dto/read-cliente.dto';
import { ReadInvitadoDto } from './dto/read-invitado.dto';
import { AvatarUsuarios } from './entities/avatarusuarios.entity';
import { Usuario } from './entities/usuarios.entity';
import { ClienteMapper } from './mapper/cliente.mapper';
import { InvitadoMapper } from './mapper/invitado.mapper';

@Injectable()
export class UsuarioService {
  constructor(
    // private readonly carroCompraService: CarroCompraService,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(AvatarUsuarios)
    private readonly avatarRepository: Repository<AvatarUsuarios>,
    @InjectRepository(CarroCompra)
    private readonly carroCompraRepository: Repository<CarroCompra>,
    @InjectRepository(DetalleCarroCompra)
    private readonly detalleCarroCompra: Repository<DetalleCarroCompra>,
    private readonly detalleCarroCompraService: DetalleCarroComprasService,
  ) {}

  // //#region Crear un nuevo usuario
  // async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
  //   // Obtengo el último ID de la base de datos
  //   const ultimousuario = await this.usuarioRepository.find({
  //     order: { idUsuario: 'DESC' },
  //     take: 1,
  //   });
  //   //Le sumo 1
  //   const siguienteid =
  //     ultimousuario.length > 0 ? ultimousuario[0].idUsuario + 1 : 1;

  //   // Asignno el nuevo ID al DTO antes de mapearlo
  //   createUsuarioDto.idUsuario = siguienteid;

  //   // Obtener el último idImagenAvatar en AvatarUsuarios y sumarle 1
  //   const ultimoAvatar = await this.avatarRepository.find({
  //     order: { idImagenAvatar: 'DESC' },
  //     take: 1,
  //   });
  //   const siguienteIdAvatar =
  //     ultimoAvatar.length > 0 ? ultimoAvatar[0].idImagenAvatar + 1 : 1;

  //   // Creo el nuevo objeto AvatarUsuarios
  //   const nuevoAvatar = new AvatarUsuarios();
  //   nuevoAvatar.idImagenAvatar = siguienteIdAvatar;
  //   nuevoAvatar.pathImaUsuario = siguienteid + '_imagen_usuario'; // Ruta de la imagen

  //   // Guardo el nuevo avatar en la base de datos
  //   const avatarGuardado = await this.avatarRepository.save(nuevoAvatar);

  //   // Asignar el ID del avatar guardado al campo idAvatar del DTO del usuario
  //   createUsuarioDto.idAvatar = avatarGuardado.idImagenAvatar;

  //   // Mapeo el DTO a la entidad Usuario antes de asignarlo
  //   const usuario = ClienteMapper.dtoToEntity(createUsuarioDto);

  //   // Guardo el usuario en la base de datos
  //   return await this.usuarioRepository.save(usuario);
  // }
  // //#endregion

  //#region Registrar Cliente
  async register(
    registerClienteDto: RegisterClienteDto,
  ): Promise<ReadClienteDto> {
    try {
      // Verificar si el RUT ya está registrado
      const usuarioExiste = await this.usuarioRepository.findOne({
        where: { rut: registerClienteDto.rutUsuario },
        relations: ['rol'],
      });
      if (usuarioExiste) {
        throw new BadRequestException(
          `El usuario con RUT ${registerClienteDto.rutUsuario} ya está registrado.`,
        );
      }

      // Verificar si el correo ya está registrado
      const correoExiste = await this.usuarioRepository.findOne({
        where: { email: registerClienteDto.correoElectronico },
        relations: ['rol'],
      });
      if (correoExiste) {
        throw new BadRequestException(
          `El correo ${registerClienteDto.correoElectronico} ya está registrado.`,
        );
      }

      // Mapear el DTO de registro a la entidad Usuario
      const usuario = ClienteMapper.dtoToEntity(registerClienteDto);

      // Guardar el usuario en la base de datos
      const usuarioGuardado = await this.usuarioRepository.save(usuario);
      // Crear Carro de Compras vacio y mapearlo
      const carroVacio = new CreateCarroCompraDto();
      carroVacio.idUsuario = usuarioGuardado.idUsuario;
      const carroMapeado = CarroCompraMapper.dtoToCarroCompraEntity(carroVacio);

      // Crear el carro de compras vacio para el usuario recién registrado
      await this.carroCompraRepository.save(carroMapeado);

      return ClienteMapper.entityToDto(usuarioGuardado);
    } catch (error) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al registrar el usuario.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Registrar Invitado
  async registerInvitado(
    registerInvitadoDto: RegisterInvitadoDto,
  ): Promise<ReadInvitadoDto> {
    try {
      // Verificar si el RUT ya está registrado
      const usuarioExiste = await this.usuarioRepository.findOne({
        where: { rut: registerInvitadoDto.rutUsuario },
        relations: ['rol'],
      });

      // validar si usuario existe en base de datos
      if (usuarioExiste) {
        if (usuarioExiste.rol.idRol === 1) {
          throw new BadRequestException(
            `El invitado ya está registrado como usuario. Debe iniciar sesión con su cuenta de usuario.`,
          );
        }
        if (usuarioExiste.rol.idRol === 2) {
          // Actualizar Datos del Invitado
          const invitadoActualizado =
            InvitadoMapper.dtoToEntity(registerInvitadoDto);
          invitadoActualizado.idUsuario = usuarioExiste.idUsuario;

          // Guardar el usuario actualizado en la base de datos
          await this.usuarioRepository.save(invitadoActualizado);

          // Obtener el usuario actualizado con su carro de compras
          const invitadoGuardado = await this.usuarioRepository.findOne({
            where: { idUsuario: usuarioExiste.idUsuario },
            relations: ['carroCompra'],
          });

          // Buscar Detalle Carro de Compras
          const idCarroCompra = invitadoGuardado.carroCompra[0]?.idCarroCompra;
          const detalleCarroCompra =
            await this.detalleCarroCompraService.obtenerDetalleCarroPorIdCarro(
              idCarroCompra,
            );

          if (detalleCarroCompra.length > 0) {
            // Eliminar detalle carro de compras
            await this.detalleCarroCompraService.vaciarCarro(
              invitadoGuardado.carroCompra[0]?.idCarroCompra,
            );
          }

          return InvitadoMapper.entityToDto(invitadoGuardado);
        }
      }

      // Crear Nuevo Invitado
      const invitadoNuevo = InvitadoMapper.dtoToEntity(registerInvitadoDto);
      const invitadoGuardado = await this.usuarioRepository.save(invitadoNuevo);
      
      // Crear Carro de Compras vacio y mapearlo
      const carroVacio = new CreateCarroCompraDto();
      carroVacio.idUsuario = invitadoGuardado.idUsuario;
      const carroMapeado = CarroCompraMapper.dtoToCarroCompraEntity(carroVacio);

      // Crear el carro de compras vacio para el usuario recién registrado
      await this.carroCompraRepository.save(carroMapeado);

      // Obtener el usuario recién registrado con su carro de compras
      const invitadoNuevoGuardado = await this.usuarioRepository.findOne({
        where: { idUsuario: invitadoGuardado.idUsuario },
        relations: ['carroCompra'],
      });

      return InvitadoMapper.entityToDto(invitadoNuevoGuardado);
    } catch (error) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            'Ha ocurrido un error inesperado al registrar el usuario invitado.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Listar todos los usuarios
  async findAll(): Promise<Usuario[]> {
    try {
      return await this.usuarioRepository.find({
        relations: ['avatar'], // Incluimos la relación con avatar
      });
    } catch (error) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al intentar obtener los usuarios.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Buscar un usuario por su RUT
  async findOne(rut: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { rut: rut },
      });
      if (!usuario) {
        throw new NotFoundException(`Usuario con rut ${rut} no encontrado`);
      }
      return usuario;
    } catch (error) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            'Ha ocurrido un error al intentar obtener el usuario por RUT.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Buscar un usuario por su ID
  async findUsuarioById(id_usuario: number) {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { idUsuario: id_usuario },
      });

      if (!usuario) {
        throw new NotFoundException(
          `Usuario con ID ${id_usuario} no encontrado`,
        );
      }

      return usuario;
    } catch (error) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            'Ha ocurrido un error al intentar obtener el usuario por ID.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  // //#region Actualizar un usuario
  // async update(
  //   rut: string,
  //   updateUsuarioDto: CreateUsuarioDto,
  // ): Promise<Usuario> {
  //   const usuario = await this.findOne(rut);
  //   const updatedUsuario = ClienteMapper.dtoToEntity(updateUsuarioDto);
  //   updatedUsuario.idUsuario = usuario.idUsuario; // Preservar el ID del usuario existente
  //   await this.usuarioRepository.save(updatedUsuario);
  //   return updatedUsuario;
  // }
  // //#endregion

  //#region Eliminar un usuario (cambia 'activo' a false)
  async remove(rut: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { rut } });
      if (!usuario) {
        throw new NotFoundException(`Usuario con RUT ${rut} no encontrado`);
      }
      if (!usuario.activo) {
        throw new BadRequestException(
          `Usuario con RUT ${rut} ya está desactivado`,
        );
      }
      usuario.activo = false;
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al intentar desactivar el usuario.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion

  //#region Reactivar un usuario (cambia 'activo' a true)
  async reactivate(rut: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { rut } });
      if (!usuario) {
        throw new NotFoundException(`Usuario con RUT ${rut} no encontrado`);
      }
      if (usuario.activo) {
        throw new BadRequestException(`Usuario con RUT ${rut} ya está activo`);
      }
      usuario.activo = true;
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      if (error instanceof HttpException) {
        // Lanzar el error con mensaje personalizado y status code
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // En caso de otros errores, lanzamos un error 500
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al intentar reactivar el usuario.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //#endregion
}
