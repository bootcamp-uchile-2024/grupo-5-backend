import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises as FS } from 'fs';
import path from 'path';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { CatalogoProductoDto } from './dto/read-catalogo-productos.dto';
import { GetProductoDto } from './dto/read-producto.dto';
import { ActualizarProductoDto } from './dto/update-producto.dto';
import { ImagenProducto } from './entities/imagenproducto.entity';
import { Producto } from './entities/producto.entity';
import { ProductoMapper } from './mapper/producto.mapper';
import { create } from 'domain';

@Injectable()
export class ProductoService {
  //#region Constructor
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(ImagenProducto)
    private imagenProductoRepository: Repository<ImagenProducto>,
  ) {}
  //#endregion

  //#region Crear Producto
  async createProducto(
    createproductodto: CreateProductoDto,
  ): Promise<Producto> {
    // Validar si existe producto con el mismo nombre
    const productoExiste = await this.getProductoPorNombre(
      createproductodto.nombreProducto,
    );
    if (productoExiste) {
      throw new BadRequestException({
        message: 'Ya existe un producto con el nombre proporcinado.',
        error: 'Conflict',
      });
    }
    //Validar si existe producto con el mismo SKU
    const productoExisteSku = await this.getProductoPorSku(createproductodto.sku);
    if (productoExisteSku) {
      throw new BadRequestException({
        message: 'Ya existe un producto con el SKU proporcinado.',
        error: 'Conflict',
      });
    }

    // Convertimos el DTO a la entidad Producto
    const producto: Producto =
      ProductoMapper.DtoToGetProductoEntity(createproductodto);

    //Guardamos el producto
    const productoGuardado: Producto =
      await this.productoRepository.save(producto);

    // Recuperamos el ID del producto guardado
    const codigoNuevoProducto = productoGuardado.idProducto;

    // Definimos la ruta base donde se guardarán las imágenes
    const rutaArchivo = `files/images/productos/${codigoNuevoProducto}/`;

    // Creamos la ruta si no existe
    this.createDir(rutaArchivo);
    for (let i = 0; i < createproductodto.imagenes.length; i++) {
      const image = createproductodto.imagenes[i];
      const filePath = path.join(
        rutaArchivo,
        `${codigoNuevoProducto}_${i + 1}`,
      );
      const imgRutaStatica = await this.uploadBase64(image, filePath);

      // Creamos la entidad ImagenProducto con el ID del producto
      const imagenProducto = new ImagenProducto();
      imagenProducto.producto = productoGuardado;
      imagenProducto.pathImagenProducto = imgRutaStatica;

      // Guardamos la imagen del producto en la base de datos
      await this.imagenProductoRepository.insert(imagenProducto);
    }
    return productoGuardado;
  }
  //#endregion

  //#region Crear Directorio
  createDir(rutaRelativaArchivo: string): string {
    try {
      const dir = FS.mkdir(rutaRelativaArchivo, { recursive: true });
      return rutaRelativaArchivo;
    } catch (error) {
      throw new Error('No se pudo crear el directorio para las imágenes.');
    }
  }
  //#endregion

  //#region Subir Archivo Base64
  async uploadBase64(strBase64: string, ruta: string): Promise<string> {
    const contenidoBase64 = this.getExtAndContentOfBase64(strBase64)[1];
    const extension = this.getExtAndContentOfBase64(strBase64)[0];
    const nombreArchivo = `${ruta}.${extension}`;
    try {
      await FS.writeFile(nombreArchivo, contenidoBase64, {
        encoding: 'base64',
      });
    } catch (error) {
      console.error('Error: ', error);
      throw new BadRequestException('Error al subir el archivo.');
    }
    return nombreArchivo;
  }
  //#endregion

  //#region Obtener Producto por Nombre
  async getProductoPorNombre(nombreProducto: string): Promise<Producto> {
    return await this.productoRepository.findOne({ where: { nombreProducto } });
  }
  //#endregion

  //#region Obtener Producto por SKU
  async getProductoPorSku(sku: string): Promise<Producto> {
    return await this.productoRepository.findOne({ where: { sku } });
  }
  //#endregion

  //#region Obtener Extensión y Contenido de Base64
  getExtAndContentOfBase64(base64: string): [string, string] {
    const matches = base64.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new Error('Formato Base64 inválido');
    }

    // Tipo MIME (por ejemplo, image/png)
    const mimeType = matches[1];
    const extension = mimeType.split('/')[1];

    // Contenido codificado en Base64
    const content = matches[2];

    return [extension, content];
  }
  //#endregion

  //#region Obtener Catálogo de Productos
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
        'p.stock',
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
  //#endregion

  //#region Obtener Catálogo de Productos Paginado
  async catalogoProductosPag(
    nroPagina: number,
    cantidadPorPagina: number,
  ): Promise<GetProductoDto[]> {
    const nroPaginaValido = nroPagina - 1;
    const offset = cantidadPorPagina * nroPaginaValido;
    const totalRegistros: number = await this.productoRepository.count();

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
        'p.stock',
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
  //#endregion

  //#region Obtener Detalle de un Producto
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
  //#endregion

  //#region Actualizar Producto
  async actualizarProducto(
    id: number,
    updateProductoDto: ActualizarProductoDto,
  ): Promise<GetProductoDto[]> {
    // Buscar el producto por ID
    const producto = await this.productoRepository.findOne({
      where: { idProducto: id },
      relations: ['imagenes', 'marca', 'categoria'], // Para cargar las relaciones
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    // Actualizar los campos del producto
    producto.nombreProducto =
      updateProductoDto.nombreProducto || producto.nombreProducto;
    producto.descripcion =
      updateProductoDto.descripcion || producto.descripcion;
    producto.sku = updateProductoDto.sku || producto.sku;
    producto.precio = updateProductoDto.precio || producto.precio;
    producto.stock = updateProductoDto.stock || producto.stock;
    producto.peso = updateProductoDto.peso || producto.peso;
    producto.tamanio = updateProductoDto.tamanio || producto.tamanio;
    producto.ingredientes =
      updateProductoDto.ingredientes || producto.ingredientes;
    producto.material = updateProductoDto.material || producto.material;
    producto.activo = updateProductoDto.activo || producto.activo;

    // Actualizar relaciones con marca y categoría
    if (updateProductoDto.idMarca) {
      producto.marca = { idMarca: updateProductoDto.idMarca } as any;
    }
    if (updateProductoDto.idCategoria) {
      producto.categoria = {
        idCategoria: updateProductoDto.idCategoria,
      } as any;
    }

    // Guardar cambios en la tabla PRODUCTOS
    await this.productoRepository.save(producto);

    // Validar y corregir las imágenes relacionadas en IMAGENES_PRODUCTOS
    if (updateProductoDto.imagenes && updateProductoDto.imagenes.length > 0) {
      // Corregir cualquier valor de pathImagenProducto que no sea una cadena
      updateProductoDto.imagenes.forEach((imagen) => {
        // if (typeof imagen.pathImagenProducto !== 'string') {
        //   // Transformar a cadena con un valor por defecto si está vacío
        //   imagen.pathImagenProducto = String(
        //     imagen.pathImagenProducto || 'ruta/por/defecto.jpg',
        //   );
        // }
      });

      // Eliminar imágenes existentes
      await this.imagenProductoRepository.delete({ producto });

      // Insertar nuevas imágenes
      const nuevasImagenes = updateProductoDto.imagenes.map((imagenDto) => {
        const nuevaImagen = new ImagenProducto();
        //nuevaImagen.pathImagenProducto = imagenDto.pathImagenProducto;
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
    return [ProductoMapper.entityToGetProductoDto(productoActualizado)];
  }
  //#endregion

  //#region Baja de un Producto
  async remove(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { idProducto: id },
    });
    if (!producto) {
      throw new NotFoundException(`Producto con Id ${id} no fue encontrado`);
    }
    if (!producto.activo) {
      throw new BadRequestException(`Producto  ${id} ya fue dado de baja`);
    }
    producto.activo = 0;
    return await this.productoRepository.save(producto);
  }
  //#endregion

  //#region Habilitar Producto
  async activate(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { idProducto: id },
    });
    if (!producto) {
      throw new NotFoundException(`Producto con Id ${id} no fue encontrado`);
    }
    if (!producto.activo) {
      throw new BadRequestException(`Producto  ${id} fue habilitado`);
    }
    producto.activo = 1;
    return await this.productoRepository.save(producto);
  }
  //#endregion
}
