import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DetalleCarroComprasService } from './detalle-carro-compras.service';
import { CreateDetalleCarroCompraDto } from './dto/create-detalle-carro-compra.dto';
import { UpdateDetalleCarrocompraDto } from './dto/update-detalle-carro-compra.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('detalle-carro-compras')
export class DetalleCarroComprasController {
  constructor(
    private readonly detalleCarroComprasService: DetalleCarroComprasService,
  ) {}

  @ApiTags('Carro de Compras')
  @ApiOperation({
    summary:
      'HU 5.1: Carrito de Compras - Agregar producto al Carro de Compras',
    description:
      '<strong>HU 5.1 - Carrito de Compra:<br></strong> Como "Pet lover" quiero un carrito de compra que permita añadir y editar varios productos, para gestionar mis compras con facilidad.',
  })
  @ApiParam({
    name: 'idCarroCompra',
    description: 'Id del carro de compras',
    required: true,
    example: 1,
  })
  @ApiParam({
    name: 'idProducto',
    description: 'Id del producto',
    required: true,
    example: 1,
  })
  @ApiParam({
    name: 'cantidad',
    description: 'Cantidad del producto',
    required: true,
    example: 10,
  })
  @Post(':idCarroCompra/:idProducto/:cantidad')
  async agregarProducto(
    @Param('idCarroCompra') idCarroCompra: number,
    @Param('idProducto') idProducto: number,
    @Param('cantidad') cantidad: number,
  ) {
    console.log('agregarProducto()');
    console.log('idCarroCompra: ', idCarroCompra);
    console.log('idProducto: ', idProducto);
    console.log('cantidad: ', cantidad);
    return this.detalleCarroComprasService.agregarProducto(
      idCarroCompra,
      idProducto,
      cantidad,
    );
  }

  @ApiTags('Temp - Detalle Carro de Compras')
  @ApiOperation({
    summary:
      'HU 5.1: Carrito de Compras - Obtener Detalle del Carro de Compras por Id del Carro',
    description:
      '<strong>HU 5.1 - Carrito de Compra:<br></strong> Como "Pet lover" quiero un carrito de compra que permita añadir y editar varios productos, para gestionar mis compras con facilidad.',
  })
  @Get(':idCarroCompra')
  @ApiParam({
    name: 'idCarroCompra',
    description: 'Id del carro de compras',
    required: true,
    example: 1,
  })
  async obtenerDetalleCarroPorIdCarro(idCarroCompra: number) {
    return await this.detalleCarroComprasService.obtenerDetalleCarroPorIdCarro(
      idCarroCompra,
    );
  }

  @ApiTags('Carro de Compras')
  @ApiOperation({
    summary:
      'HU 5.1: Carrito de Compras - Actualizar Cantidad de Producto en el Carro de Compras',
    description:
      '<strong>HU 5.1 - Carrito de Compra:<br></strong> Como "Pet lover" quiero un carrito de compra que permita añadir y editar varios productos, para gestionar mis compras con facilidad.',
  })
  @ApiParam({
    name: 'idCarroCompra',
    description: 'Id del carro de compras',
    required: true,
    example: 1,
  })
  @ApiParam({
    name: 'idProducto',
    description: 'Id del producto',
    required: true,
    example: 1,
  })
  @ApiParam({
    name: 'cantidad',
    description: 'Cantidad del producto',
    required: true,
    example: 10,
  })
  @Patch(':idCarroCompra,:idProducto,:cantidad')
  actualizarCantidadProducto(
    @Param('idCarroCompra') idCarroCompra: number,
    @Param('idProducto') idProducto: number,
    @Param('cantidad') cantidad: number,
  ) {
    return this.detalleCarroComprasService.actualizarCantidadProducto(
      idCarroCompra,
      idProducto,
      cantidad,
    );
  }

  @ApiTags('Carro de Compras')
  @ApiOperation({
    summary:
      'HU 5.1: Carrito de Compras - Eliminar un Producto del Carro de Compras',
    description:
      '<strong>HU 5.1 - Carrito de Compra:<br></strong> Como "Pet lover" quiero un carrito de compra que permita añadir y editar varios productos, para gestionar mis compras con facilidad.',
  })
  @ApiParam({
    name: 'idCarroCompra',
    description: 'Id del carro de compras',
    required: true,
    example: 1,
  })
  @ApiParam({
    name: 'idProducto',
    description: 'Id del producto',
    required: true,
    example: 1,
  })
  @Delete(':idCarroCompra,:idProducto')
  eliminarProducto(
    @Param('idCarroCompra') idCarroCompra: number,
    @Param('idProducto') idProducto: number,
  ) {
    return this.detalleCarroComprasService.eliminarProducto(
      idCarroCompra,
      idProducto,
    );
  }
}
