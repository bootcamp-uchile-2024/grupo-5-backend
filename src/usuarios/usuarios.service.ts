import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarroCompraDto } from 'src/carro-compras/dto/create-carro-compra.dto';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { RegisterUsuarioDto } from './dto/register-usuario.dto';
import { AvatarUsuarios } from './entities/avatarusuarios.entity';
import { Usuario } from './entities/usuarios.entity';
import { UsuarioMapper } from './mapper/usuario.mapper';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { CarroCompraMapper } from 'src/carro-compras/mapper/carro-compra.mapper';

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


  ) {}

  //#region Crear un nuevo usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Obtengo el último ID de la base de datos
    const ultimousuario = await this.usuarioRepository.find({
      order: { idUsuario: 'DESC' },
      take: 1,
    });
    //Le sumo 1
    const siguienteid =
      ultimousuario.length > 0 ? ultimousuario[0].idUsuario + 1 : 1;

    // Asignno el nuevo ID al DTO antes de mapearlo
    createUsuarioDto.idUsuario = siguienteid;

    // Obtener el último idImagenAvatar en AvatarUsuarios y sumarle 1
    const ultimoAvatar = await this.avatarRepository.find({
      order: { idImagenAvatar: 'DESC' },
      take: 1,
    });
    const siguienteIdAvatar =
      ultimoAvatar.length > 0 ? ultimoAvatar[0].idImagenAvatar + 1 : 1;

    // Creo el nuevo objeto AvatarUsuarios
    const nuevoAvatar = new AvatarUsuarios();
    nuevoAvatar.idImagenAvatar = siguienteIdAvatar;
    nuevoAvatar.pathImaUsuario = siguienteid + '_imagen_usuario'; // Ruta de la imagen

    // Guardo el nuevo avatar en la base de datos
    const avatarGuardado = await this.avatarRepository.save(nuevoAvatar);

    // Asignar el ID del avatar guardado al campo idAvatar del DTO del usuario
    createUsuarioDto.idAvatar = avatarGuardado.idImagenAvatar;

    // Mapeo el DTO a la entidad Usuario antes de asignarlo
    const usuario = UsuarioMapper.dtoToEntity(createUsuarioDto);

    // Guardo el usuario en la base de datos
    return await this.usuarioRepository.save(usuario);
  }
  //#endregion

  //#region Registrar un nuevo usuario
  async register(registerUsuarioDto: RegisterUsuarioDto): Promise<Usuario> {
    // Verificar si el RUT ya está registrado
    const usuarioExiste = await this.usuarioRepository.findOne({  where: { rut: registerUsuarioDto.rutUsuario } });
    if (usuarioExiste) {
      throw new BadRequestException(
        `El usuario con RUT ${registerUsuarioDto.rutUsuario} ya está registrado.`,
      );
    }
    
    // Verificar si el correo ya está registrado
    const correoExiste = await this.usuarioRepository.findOne({ where: { email: registerUsuarioDto.correoElectronico } });
    if (correoExiste) {
      throw new BadRequestException(
        `El correo ${registerUsuarioDto.correoElectronico} ya está registrado.`, 
      );  
    }

    // Mapear el DTO de registro a la entidad Usuario
    const usuario = UsuarioMapper.dtoRegisterUsuarioToEntity(registerUsuarioDto);
    
    // Guardar el usuario en la base de datos
    const usuarioGuardado = await this.usuarioRepository.save(usuario);
    // Crear Carro de Compras vacio y mapearlo
    const carroVacio = new CreateCarroCompraDto();
    carroVacio.idUsuario = usuarioGuardado.idUsuario; 
    const carroMapeado = CarroCompraMapper.dtoToCarroCompraEntity(carroVacio);
    
    // Crear el carro de compras vacio para el usuario recién registrado   
    await this.carroCompraRepository.save(carroMapeado);

    return usuarioGuardado;
  }
  //#endregion

  //#region Listar todos los usuarios
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: ['avatar'], // Incluimos la relación con avatar
    });
  }
  //#endregion

  //#region Buscar un usuario por su RUT
  async findOne(rut: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { rut: rut },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con rut ${rut} no encontrado`);
    }
    return usuario;
  }
  //#endregion

  //#region Buscar un usuario por su ID
  async findUsuarioById(id_usuario: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: id_usuario } });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);
    }

    return usuario;
  }
  //#endregion

  //#region Actualizar un usuario
  async update( rut: string, updateUsuarioDto: CreateUsuarioDto,): Promise<Usuario> {
    const usuario = await this.findOne(rut);
    const updatedUsuario = UsuarioMapper.dtoToEntity(updateUsuarioDto);
    updatedUsuario.idUsuario = usuario.idUsuario; // Preservar el ID del usuario existente
    await this.usuarioRepository.save(updatedUsuario);
    return updatedUsuario;
  }
  //#endregion

  //#region Eliminar un usuario (cambia 'activo' a false)
  async remove(rut: string): Promise<Usuario> {
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
  }
  //#endregion

  //#region Reactivar un usuario (cambia 'activo' a true)
  async reactivate(rut: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { rut } });
    console.log('usuario: ', usuario);
    if (!usuario) {
      throw new NotFoundException(`Usuario con RUT ${rut} no encontrado`);
    }
    console.log('usuario activo: ', usuario.activo);
    if (usuario.activo) {
      throw new BadRequestException(`Usuario con RUT ${rut} ya está activo`);
    }
    usuario.activo = true;
    return await this.usuarioRepository.save(usuario);
  }
  //#endregion
}
