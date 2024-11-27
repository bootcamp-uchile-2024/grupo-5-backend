import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { Producto } from "./entities/producto.entity";
import { ProductoMapper } from "./mapper/producto.mapper";
import { CatalogoProductoDto } from "./dto/read-catalogo-productos.dto";
import { GetProductoDto } from "./dto/read-producto.dto";
import { CreateProductoDto } from './dto/create-producto.dto';
import { ActualizarProductoDto } from "./dto/update-producto.dto";
import { ImagenProducto } from "./entities/imagenproducto.entity";


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

  return ProductoMapper.entityListToGetProductoDtoList(productos);
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

  return ProductoMapper.entityListToGetProductoDtoList(productosDet);
}


// async update( rut: string, updateUsuarioDto: CreateUsuarioDto,): Promise<Usuario> {
//   const usuario = await this.findOne(rut);
//   const updatedUsuario = UsuarioMapper.dtoToEntity(updateUsuarioDto);
//   updatedUsuario.idUsuario = usuario.idUsuario; // Preservar el ID del usuario existente
//   await this.usuarioRepository.save(updatedUsuario);
//   return updatedUsuario;

//Con el id producto en imagnes_Producto obtenemos el id de imagen
//conel id de imagen actualizo la rut y nobre
async actualizarProducto( id: number, updateProductoDto: ActualizarProductoDto): Promise<Producto> {
  const producto = await this.productoRepository.findOne({ where: { idProducto: id } });
  console.log('producto---->', producto);
  if (!producto) {
    throw new NotFoundException(`Producto con Id ${id} no fue encontrado`);
  }
  const updateProducto = ProductoMapper.DtoToGetProductoEntity(updateProductoDto);
  updateProducto.idProducto = producto.idProducto; 
  const productoActualizado : Producto = await this.productoRepository.save(updateProducto);
   for (const imagen of productoActualizado.imagenes) {
      console.log('imagen.idImagen---->', imagen.idImagen);
      const imagenUpdate = await this.imagenProductoRepository.findOne({where : { idImagen: imagen.idImagen}})
      console.log('1.- imagenUpdate---->', imagenUpdate);
      imagen.producto = imagenUpdate.producto;
      console.log('2.- imagenUpdate: ',imagenUpdate);
      imagen.pathImagenProducto = imagenUpdate.pathImagenProducto.toString();
      console.log('imagen.pathImagenProducto',imagen.pathImagenProducto);
    await this.imagenProductoRepository.save(imagen);
   }
  return updateProducto;
}

async getImagesProduct(idProducto: number) : Promise<ImagenProducto[]> { 
  const imagenesProductos = await this.imagenProductoRepository
  .createQueryBuilder('ip')
  .where('ip.idProducto = :idProducto', { idProducto })
  .getMany();
  return imagenesProductos;



}



async remove(id: number): Promise<Producto> {
  const producto = await this.productoRepository.findOne({ where: { idProducto: id } });
  if (!producto) {
    throw new NotFoundException(`Producto con Id ${id} no fue encontrado`);
  }
  if (!producto.activo) {
    throw new BadRequestException(
      `Producto  ${id} ya está desactivado`,
    );
  }
  producto.activo = 0;
  return await this.productoRepository.save(producto);
}


}
