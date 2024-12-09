import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMarcaProductoDto } from './dto/create-marca-producto.dto';
import { UpdateMarcaProductoDto } from './dto/update-marca-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MarcaProducto } from './entities/marca-producto.entity';
import { Repository } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { MarcaProductoMapper } from './mapper/marca-producto.mapper';

@Injectable()
export class MarcaProductoService {
  constructor(
    @InjectRepository(MarcaProducto)
    private MarcaProductoRepository: Repository<MarcaProducto>,
    @InjectRepository(Producto)
    private ProductoRepository: Repository<Producto>,
  ) {}

  async create(
    createMarcaProductoDto: CreateMarcaProductoDto,
  ): Promise<MarcaProducto> {
    // Validar si la marca ya existe
    const mmarcaExiste = await this.MarcaProductoRepository.findOne({
      where: { nombreMarca: createMarcaProductoDto.nombreMarca },
    });
    if (mmarcaExiste) {
      throw new HttpException(
        { message: 'La marca ya existe.', error: 'Conflict' },
        HttpStatus.CONFLICT,
      );
    }
    // Mapear el DTO a una entidad de tipo MarcaProducto
    const marcaProducto = MarcaProductoMapper.dtoCreateMarcaProductoToEntity(createMarcaProductoDto);
    
    // Guardar la entidad en la base de datos
    return await this.MarcaProductoRepository.save(marcaProducto);
  }

  async findAll(): Promise<MarcaProducto[]> {
    return await this.MarcaProductoRepository.find();
  }

  async findOne(idMarcaProducto: number): Promise<MarcaProducto> {
    // Buscar la marca por su id
    const marca = await this.MarcaProductoRepository.findOne({
      where: { idMarca: idMarcaProducto },
    });
    // Validar si la marca no existe
    if (!marca) {
      throw new HttpException(
        { message: 'Marca no encontrada', error: 'Not Found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return marca;
  }

  async update(
    id: number,
    updateMarcaProductoDto: UpdateMarcaProductoDto,
  ): Promise<MarcaProducto> {
    // Buscar la marca por su id
    const marca = await this.MarcaProductoRepository.findOne({
      where: { idMarca: id },
    });
    if (!marca) {
      throw new HttpException(
        { message: 'Marca no encontrada', error: 'Not Found' },
        HttpStatus.NOT_FOUND,
      );
    }

    // Mapear el DTO a una entidad de tipo MarcaProducto
    marca.nombreMarca = updateMarcaProductoDto.nombreMarca;

    // Actualizar y guardar la entidad en la base de datos
    return await this.MarcaProductoRepository.save(marca);
  }

  async remove(idMarcaProducto: number) {
    // Buscar la marca por su id
    const marca = await this.MarcaProductoRepository.findOne({
      where: { idMarca: idMarcaProducto },
    });
    if (!marca) {
      throw new HttpException(
        { message: 'Marca no encontrada', error: 'Not Found' },
        HttpStatus.NOT_FOUND,
      );
    }
    // validar si la marca tiene productos asociados
    const productos = await this.ProductoRepository.find({
      where: { marca: marca },
    });

    console.log('########### Productos: ', productos);
    if (productos.length > 0) {
      throw new HttpException(
        {
          message:
            'La marca no se puede eliminar porque tiene productos asociados',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }
    return await this.MarcaProductoRepository.remove(marca);
  }
}
