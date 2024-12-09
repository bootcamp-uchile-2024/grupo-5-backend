import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoriaProductoDto } from './dto/create-categoria-producto.dto';
import { UpdateCategoriaProductoDto } from './dto/update-categoria-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaProducto } from './entities/categoria-producto.entity';
import { Repository } from 'typeorm';
import { CategoriaProductoMapper } from './mapper/categoria-producto.mapper';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class CategoriaProductoService {
  constructor(
    @InjectRepository(CategoriaProducto)
    private CategoriaProductoRepository: Repository<CategoriaProducto>,
    @InjectRepository(Producto)
    private ProductoRepository: Repository<Producto>,
  ) {}

  async create(
    createCategoriaProductoDto: CreateCategoriaProductoDto,
  ): Promise<CategoriaProducto> {
    // Validar si la categoría ya existe
    const categoriaExiste = await this.CategoriaProductoRepository.findOne({
      where: { nombreCategoria: createCategoriaProductoDto.nombreCategoria },
    });
    if (categoriaExiste) {
      throw new HttpException(
        { message: 'La categoría ya existe.', error: 'Conflict' },
        HttpStatus.CONFLICT,
      );
    }
    // Mapear el DTO a una entidad de tipo CategoriaProducto
    const categoriaProducto = CategoriaProductoMapper.dtoCreateCategoriaProductoToEntity(createCategoriaProductoDto);

    // Guardar la entidad en la base de datos
    return await this.CategoriaProductoRepository.save(categoriaProducto);
  }

  async findAll(): Promise<CategoriaProducto[]> {
    return await this.CategoriaProductoRepository.find();
  }

  async findOne(idCategoriaProducto: number): Promise<CategoriaProducto> {
    // Buscar la categoría por su id
    const categoría = await this.CategoriaProductoRepository.findOne({
      where: { idCategoria: idCategoriaProducto },
    });
    // Validar si la categoría no existe
    if (!categoría) {
      throw new HttpException(
        { message: 'Categoria no encontrada', error: 'Not Found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return categoría;
  }

  async update(id: number, updateCategoriaProductoDto: UpdateCategoriaProductoDto): Promise<CategoriaProducto> {
    // Buscar la categoría por su id
    const categoria = await this.CategoriaProductoRepository.findOne({
      where: { idCategoria: id },
    });
    // Validar si la categoría no existe
    if (!categoria) {
      throw new HttpException(
        { message: 'Categoria no encontrada', error: 'Not Found' },
        HttpStatus.NOT_FOUND,
      );
    }
    // Mapear el DTO a una entidad de tipo CategoriaProducto
    const categoriaProducto = CategoriaProductoMapper.dtoUpdateCategoriaProductoToEntity(updateCategoriaProductoDto);

    // Guardar la entidad en la base de datos
    return await this.CategoriaProductoRepository.save(categoriaProducto);
  }

 async remove(id: number) {
    // Buscar la categoría por su id
    const categoria = await this.CategoriaProductoRepository.findOne({
      where: { idCategoria: id },
    });
    // Validar si la categoría no existe
    if (!categoria) {
      throw new HttpException(
        { message: 'Categoria no encontrada', error: 'Not Found' },
        HttpStatus.NOT_FOUND,
      );
    }
    // Validar si la categoría tiene productos asociados
    const productos = await this.ProductoRepository.find({
      where: { categoria: categoria },
    });
    if (productos.length > 0) {
      throw new HttpException(
        { message: 'La categoría tiene productos asociados.', error: 'Conflict' },
        HttpStatus.CONFLICT,
      );
    }

    // Eliminar la categoría de la base de datos
    return await this.CategoriaProductoRepository.remove(categoria);
  }
  }

