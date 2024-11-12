import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearCarroCompraDto, CrearItemDto } from './dto/create-carrocompra.dto';
import { UpdateCarroCompraDto } from './dto/update-carrocompra.dto';
import { CarroCompras } from './entities/carrocompra.entity';
import { DetalleCarroCompra } from './entities/detallescarrocompra.entity';

@Injectable()
export class CarroComprasService {
  private carritosDeCompras: CarroCompras[] = []; // Almacenamiento temporal en memoria para los carritos

  // Crear un nuevo carrito de compras
  crearCarritoDeCompras(dto: CrearCarroCompraDto): CarroCompras {
    const nuevoCarrito: CarroCompras = {
      idCarroCompras: this.carritosDeCompras.length + 1,
      fechaCreacion: new Date(),
      idUsuario: dto.idUsuario,
      usuario: null, // Asigna el usuario adecuado aquí si es necesario
      detalleCarroCompra: dto.items.map((item) => this.mapearItemDtoADetalleCarro(item)),
    };
    this.carritosDeCompras.push(nuevoCarrito);
    return nuevoCarrito;
  }

  // Método auxiliar para mapear CrearItemDto a DetalleCarroCompra
  private mapearItemDtoADetalleCarro(itemDto: CrearItemDto): DetalleCarroCompra {
    const detalle = new DetalleCarroCompra();
    detalle.idDetalleCarro = this.generarIdDetalle(); // Generar un ID único para el detalle
    detalle.idProducto = itemDto.idProducto;
    detalle.cantidad = itemDto.cantidad;
    detalle.precioUnitario = itemDto.precioUnitario;
    detalle.carroCompra = null; // Esto se puede establecer si es necesario más adelante
    return detalle;
  }

  // Generar un ID temporal para DetalleCarroCompra
  private generarIdDetalle(): number {
    return Math.floor(Math.random() * 10000); // Generación de ID aleatorio
  }

  // Obtener un carrito de compras por ID
  obtenerCarritoDeCompras(id: number): CarroCompras {
    const carrito = this.carritosDeCompras.find((c) => c.idCarroCompras === id);
    if (!carrito) {
      throw new NotFoundException(`Carro de compras con ID ${id} no encontrado`);
    }
    return carrito;
  }

  // Agregar un producto al carrito
  agregarProductoAlCarrito(id: number, itemDto: CrearItemDto): CarroCompras {
    const carrito = this.obtenerCarritoDeCompras(id);
    const detalleExistente = carrito.detalleCarroCompra.find(item => item.idProducto === itemDto.idProducto);
    
    if (detalleExistente) {
      detalleExistente.cantidad += itemDto.cantidad;
    } else {
      const nuevoDetalle = this.mapearItemDtoADetalleCarro(itemDto);
      carrito.detalleCarroCompra.push(nuevoDetalle);
    }

    return carrito;
  }

  // Modificar la cantidad de un producto en el carrito
  actualizarCantidadProducto(id: number, idProducto: number, cantidad: number): CarroCompras {
    const carrito = this.obtenerCarritoDeCompras(id);
    const detalle = carrito.detalleCarroCompra.find(item => item.idProducto === idProducto);

    if (!detalle) {
      throw new NotFoundException(`Producto con ID ${idProducto} no encontrado en el carrito`);
    }

    detalle.cantidad = cantidad;
    return carrito;
  }

  // Eliminar un producto del carrito
  eliminarProductoDelCarrito(id: number, idProducto: number): CarroCompras {
    const carrito = this.obtenerCarritoDeCompras(id);
    const index = carrito.detalleCarroCompra.findIndex(item => item.idProducto === idProducto);

    if (index === -1) {
      throw new NotFoundException(`Producto con ID ${idProducto} no encontrado en el carrito`);
    }

    carrito.detalleCarroCompra.splice(index, 1);
    return carrito;
  }

  // Actualizar un carrito de compras por ID
  actualizarCarritoDeCompras(id: number, dto: UpdateCarroCompraDto): CarroCompras {
    const carrito = this.obtenerCarritoDeCompras(id);

    if (dto.items) {
      carrito.detalleCarroCompra = dto.items.map((item) => this.mapearItemDtoADetalleCarro(item));
    }
    if (dto.idUsuario) {
      carrito.idUsuario = dto.idUsuario;
    }

    return carrito;
  }

  // Eliminar un carrito de compras por ID
  eliminarCarritoDeCompras(id: number): void {
    const index = this.carritosDeCompras.findIndex((c) => c.idCarroCompras === id);
    if (index === -1) {
      throw new NotFoundException(`Carro de compras con ID ${id} no encontrado`);
    }
    this.carritosDeCompras.splice(index, 1);
  }

  // Procesar carrito de compras y calcular subtotal, descuento, IVA y total
  procesarCarritoDeCompras(id: number, porcentajeDescuento: number, tasaIVA: number) {
    const carrito = this.obtenerCarritoDeCompras(id);
    const subtotal = this.calcularSubtotal(carrito.detalleCarroCompra);
    const descuento = this.calcularDescuento(subtotal, porcentajeDescuento);
    const iva = this.calcularIVA(subtotal, tasaIVA);
    const total = this.calcularTotal(subtotal, descuento, iva);

    return {
      subtotal,
      descuento,
      iva,
      total,
    };
  }
  
  // Métodos auxiliares de cálculo
  private calcularSubtotal(items: DetalleCarroCompra[]): number {
    return items.reduce((subtotal, item) => subtotal + item.precioUnitario * item.cantidad, 0);
  }

  private calcularDescuento(subtotal: number, porcentajeDescuento: number): number {
    return subtotal * (porcentajeDescuento / 100);
  }

  private calcularIVA(subtotal: number, tasaIVA: number): number {
    return subtotal * (tasaIVA / 100);
  }

  private calcularTotal(subtotal: number, descuento: number, iva: number): number {
    return subtotal - descuento + iva;
  }
}
