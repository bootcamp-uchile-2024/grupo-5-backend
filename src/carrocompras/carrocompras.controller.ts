import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CarroComprasService } from './carrocompras.service';
import { CrearCarroCompraDto, CrearItemDto } from './dto/create-carrocompra.dto';
import { UpdateCarroCompraDto } from './dto/update-carrocompra.dto';
import { CarroCompras } from './entities/carrocompra.entity';

@ApiTags('Carrito de Compras')
@Controller('carritos-de-compras')
export class CarroComprasController {
  constructor(private readonly carroComprasService: CarroComprasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo carrito de compras' })
  @ApiBody({ type: CrearCarroCompraDto })
  @ApiResponse({ status: 201, description: 'Carrito de compras creado exitosamente', type: CarroCompras })
  crearCarritoDeCompras(@Body() dto: CrearCarroCompraDto) {
    return this.carroComprasService.crearCarritoDeCompras(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un carrito de compras por ID' })
  @ApiParam({ name: 'id', description: 'ID del carrito de compras', type: Number })
  @ApiResponse({ status: 200, description: 'Carrito de compras encontrado', type: CarroCompras })
  @ApiResponse({ status: 404, description: 'Carrito de compras no encontrado' })
  obtenerCarritoDeCompras(@Param('id') id: number) {
    return this.carroComprasService.obtenerCarritoDeCompras(id);
  }

  @Post(':id/agregar-producto')
  @ApiOperation({ summary: 'Agregar un producto al carrito' })
  @ApiParam({ name: 'id', description: 'ID del carrito de compras', type: Number })
  @ApiBody({ type: CrearItemDto })
  @ApiResponse({ status: 200, description: 'Producto agregado al carrito', type: CarroCompras })
  agregarProductoAlCarrito(@Param('id') id: number, @Body() itemDto: CrearItemDto) {
    return this.carroComprasService.agregarProductoAlCarrito(id, itemDto);
  }

  @Put(':id/actualizar-cantidad-producto/:idProducto')
  @ApiOperation({ summary: 'Modificar la cantidad de un producto en el carrito' })
  @ApiParam({ name: 'id', description: 'ID del carrito de compras', type: Number })
  @ApiParam({ name: 'idProducto', description: 'ID del producto', type: Number })
  @ApiBody({ schema: { type: 'object', properties: { cantidad: { type: 'number', example: 2, description: 'Nueva cantidad' } } } })
  @ApiResponse({ status: 200, description: 'Cantidad del producto actualizada', type: CarroCompras })
  actualizarCantidadProducto(@Param('id') id: number, @Param('idProducto') idProducto: number, @Body('cantidad') cantidad: number) {
    return this.carroComprasService.actualizarCantidadProducto(id, idProducto, cantidad);
  }

  @Delete(':id/eliminar-producto/:idProducto')
  @ApiOperation({ summary: 'Eliminar un producto del carrito' })
  @ApiParam({ name: 'id', description: 'ID del carrito de compras', type: Number })
  @ApiParam({ name: 'idProducto', description: 'ID del producto', type: Number })
  @ApiResponse({ status: 200, description: 'Producto eliminado del carrito', type: CarroCompras })
  eliminarProductoDelCarrito(@Param('id') id: number, @Param('idProducto') idProducto: number) {
    return this.carroComprasService.eliminarProductoDelCarrito(id, idProducto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un carrito de compras por ID' })
  @ApiParam({ name: 'id', description: 'ID del carrito de compras', type: Number })
  @ApiResponse({ status: 200, description: 'Carrito de compras eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Carrito de compras no encontrado' })
  eliminarCarritoDeCompras(@Param('id') id: number) {
    return this.carroComprasService.eliminarCarritoDeCompras(id);
  }

  @Post(':id/procesar')
  @ApiOperation({ summary: 'Procesar carrito de compras y calcular subtotal, descuento, IVA y total' })
  @ApiParam({ name: 'id', description: 'ID del carrito de compras', type: Number })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        porcentajeDescuento: { type: 'number', example: 10, description: 'Porcentaje de descuento aplicado' },
        tasaIVA: { type: 'number', example: 19, description: 'Tasa de IVA aplicada' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Resultados del cálculo de subtotal, descuento, IVA y total',
    schema: {
      example: {
        subtotal: 100,
        descuento: 10,
        iva: 19,
        total: 109,
      },
    },
  })
  procesarCarritoDeCompras(
    @Param('id') id: number,
    @Body('porcentajeDescuento') porcentajeDescuento: number,
    @Body('tasaIVA') tasaIVA: number
  ) {
    return this.carroComprasService.procesarCarritoDeCompras(id, porcentajeDescuento, tasaIVA);
  }
}
