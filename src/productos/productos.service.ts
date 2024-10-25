import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoDto } from './dto/producto.dto';


@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>, // Inyectamos el repositorio de Producto
  ) {}

  // Método para obtener todos los productos con sus relaciones
  async findAll(): Promise<Producto[]> {
    try{
      const productos = this.productoRepository.find({
          relations: ['categoria', 'marca'], // Relaciones con categoria y marca
        });
        console.log('Productos:', productos);
        return productos;

      } catch (error) {
        console.error('Error al obtener productos:', error);
        throw new InternalServerErrorException('Error al obtener productos');
      }
    }
  }
