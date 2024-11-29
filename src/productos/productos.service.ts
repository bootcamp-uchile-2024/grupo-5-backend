import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductoDto } from './dto/create-producto.dto';
import { CatalogoProductoDto } from "./dto/read-catalogo-productos.dto";
import { GetProductoDto } from "./dto/read-producto.dto";
import { ActualizarProductoDto } from "./dto/update-producto.dto";
import { ImagenProducto } from "./entities/imagenproducto.entity";
import { Producto } from "./entities/producto.entity";
import { ProductoMapper } from "./mapper/producto.mapper";


@Injectable()
export class ProductoService {

  constructor(
    @InjectRepository(Producto)  private productoRepository: Repository<Producto>, 
    @InjectRepository(ImagenProducto) private imagenProductoRepository: Repository<ImagenProducto>,
  ) {}


  async createProducto(createproductodto: CreateProductoDto): Promise<Producto> {
    const producto : Producto = ProductoMapper.DtoToGetProductoEntity(createproductodto);
    const productoGuardado : Producto = await this.productoRepository.save(producto);

    for (const imagen of producto.imagenes) {
      const imagenProducto = new ImagenProducto();
      imagenProducto.producto = productoGuardado;
      imagenProducto.pathImagenProducto = imagen.toString();
     this.imagenProductoRepository.save(imagenProducto);
    }
    return productoGuardado;
  }


  async catalogoProductos(): Promise<CatalogoProductoDto[]> {
    const productos = await this.productoRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.marca', 'mp')  
      .leftJoinAndSelect('p.categoria', 'cp') 
      .leftJoinAndSelect('p.imagenes', 'img')  
      .select([
        'p.idProducto', 
        'mp.nombreMarca', 
        'cp.nombreCategoria',  
        'cp.descripcionCategoria',  
        'p.nombreProducto',
        'p.descripcion',
        'p.precio',
        'p.peso',
        'p.tamanio',
        'p.ingredientes',
        'p.material',
        'img.pathImagenProducto', 
      ])
      .getMany();

      //console.log(productos);

    return ProductoMapper.entityListToCatalogoDtoList(productos);
}

async catalogoProductosPag(nroPagina: number, cantidadPorPagina: number): Promise<GetProductoDto[]> {
  const nroPaginaValido = nroPagina - 1;
  const offset = cantidadPorPagina * nroPaginaValido;
  const totalRegistros : number = await this.productoRepository.count ();

   // Si no hay productos, lanzar excepción
   if (totalRegistros === 0) {
    throw new NotFoundException('No se encontraron productos.');
  }

  const productos = await this.productoRepository
    .createQueryBuilder('p')
    .leftJoinAndSelect('p.marca', 'mp')  
    .leftJoinAndSelect('p.categoria', 'cp') 
    .leftJoinAndSelect('p.imagenes', 'img')  
    .select([
      'p.idProducto', 
      'mp.nombreMarca', 
      'cp.nombreCategoria',  
      'cp.descripcionCategoria',  
      'p.nombreProducto',
      'p.descripcion',
      'p.precio',
      'p.peso',
      'p.tamanio',
      'p.ingredientes',
      'p.material',
      'img.pathImagenProducto', 
    ])
    .orderBy('p.idProducto', 'ASC')
    .addOrderBy('p.precio', 'DESC')
    .take(cantidadPorPagina)
    .skip(offset)
    .getMany();

    //console.log(productos);

  return await ProductoMapper.entityListToGetProductoDtoList(productos);
}
async DetalleProducto(id: number): Promise<GetProductoDto[]> {
  const productosDet = await this.productoRepository
    .createQueryBuilder('p')
    .leftJoinAndSelect('p.marca', 'mp')  
    .leftJoinAndSelect('p.categoria', 'cp') 
    .leftJoinAndSelect('p.imagenes', 'img')
    .where('p.idProducto = :id', { id }) 
    .select([
      'p.idProducto', 
      'p.nombreProducto',
      'mp.nombreMarca', 
      'p.descripcion',
      'p.sku',
      'p.precio',
      'p.stock',
      'p.peso',
      'p.tamanio',
      'p.ingredientes',
      'img.idImagen',
      'img.pathImagenProducto', 
      'p.material',
      'cp.nombreCategoria',   
    ])
      .getMany();

    //console.log(productosDet);

  return await ProductoMapper.entityListToGetProductoDtoList(productosDet);
}


async actualizarProducto(id: number, updateProductoDto: ActualizarProductoDto,): Promise<GetProductoDto[]> {
  // Buscar el producto por ID
  const producto = await this.productoRepository.findOne({
    where: { idProducto: id },
    relations: ['imagenes', 'marca', 'categoria'], // Para cargar las relaciones
  });

  if (!producto) {
    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  }

  // Actualizar los campos del producto
  producto.nombreProducto = updateProductoDto.nombreProducto || producto.nombreProducto;
  producto.descripcion = updateProductoDto.descripcion || producto.descripcion;
  producto.sku = updateProductoDto.sku || producto.sku;
  producto.precio = updateProductoDto.precio || producto.precio;
  producto.stock = updateProductoDto.stock || producto.stock;
  producto.peso = updateProductoDto.peso || producto.peso;
  producto.tamanio = updateProductoDto.tamanio || producto.tamanio;
  producto.ingredientes = updateProductoDto.ingredientes || producto.ingredientes;
  producto.material = updateProductoDto.material || producto.material;
  producto.activo = updateProductoDto.activo || producto.activo;

  // Actualizar relaciones con marca y categoría
  if (updateProductoDto.idMarca) {
    producto.marca = { idMarca: updateProductoDto.idMarca } as any;
  }
  if (updateProductoDto.idCategoria) {
    producto.categoria = { idCategoria: updateProductoDto.idCategoria } as any;
  }

  // Guardar cambios en la tabla PRODUCTOS
  await this.productoRepository.save(producto);

  // Validar y corregir las imágenes relacionadas en IMAGENES_PRODUCTOS
  if (updateProductoDto.imagenes && updateProductoDto.imagenes.length > 0) {
    // Corregir cualquier valor de pathImagenProducto que no sea una cadena
    updateProductoDto.imagenes.forEach((imagen) => {
      if (typeof imagen.pathImagenProducto !== 'string') {
        // Transformar a cadena con un valor por defecto si está vacío
        imagen.pathImagenProducto = String(imagen.pathImagenProducto || 'ruta/por/defecto.jpg');
      }
    });

    // Eliminar imágenes existentes
    await this.imagenProductoRepository.delete({ producto });

    // Insertar nuevas imágenes
    const nuevasImagenes = updateProductoDto.imagenes.map((imagenDto) => {
      const nuevaImagen = new ImagenProducto();
      nuevaImagen.pathImagenProducto = imagenDto.pathImagenProducto;
      nuevaImagen.producto = producto; // Asociar con el producto
      return nuevaImagen;
    });
    await this.imagenProductoRepository.save(nuevasImagenes);
  }

  // Obtener el producto actualizado con relaciones
  const productoActualizado = await this.productoRepository.findOne({
    where: { idProducto: id },
    relations: ['imagenes', 'marca', 'categoria'],
  });

  // Mapear a GetProductoDto y retornar
  return await [ProductoMapper.entityToGetProductoDto(productoActualizado)];
}

async remove(id: number): Promise<Producto> {
  const producto = await this.productoRepository.findOne({ where: { idProducto: id } });
  if (!producto) {
    throw new NotFoundException(`Producto con Id ${id} no fue encontrado`);
  }
  if (!producto.activo) {
    throw new BadRequestException(
      `Producto  ${id} ya fue dado de baja`,
    );
  }
  producto.activo = 0;
  return await this.productoRepository.save(producto);
}

async activate(id: number): Promise<Producto> {
  const producto = await this.productoRepository.findOne({ where: { idProducto: id } });
  if (!producto) {
    throw new NotFoundException(`Producto con Id ${id} no fue encontrado`);
  }
  if (!producto.activo) {
    throw new BadRequestException(
      `Producto  ${id} fue habilitado`,
    );
  }
  producto.activo = 1;
  return await this.productoRepository.save(producto);
}
}
