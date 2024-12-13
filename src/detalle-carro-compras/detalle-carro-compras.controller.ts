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

  //#region Agregar Producto Al Carro de Compras
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
  @Post('agregarProducto/:idCarroCompra/:idProducto')
  agregarProducto(
    @Param('idCarroCompra') idCarroCompra: number,
    @Param('idProducto') idProducto: number,
  ) {
    console.log('### idCarroCompra', idCarroCompra);
    console.log('### idProducto', idProducto);
     return this.detalleCarroComprasService.agregarProducto(
      idCarroCompra,
      idProducto,
    );
  }
  //#endregion

  //#region Obtener Detalle del Carro de Compras por Id del Carro
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
  //#endregion

  //#region Incrementar Cantidad de Producto ya Agregado al Carro de Compras
  @ApiTags('Carro de Compras')
  @ApiOperation({
    summary:
      'HU 5.1: Carrito de Compras - Incrementar Cantidad de Producto ya Agregado al Carro de Compras',
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
  @Patch('incrementarProducto/:idCarroCompra/:idProducto')
  incrementarProductoEnCarro(
    @Param('idCarroCompra') idCarroCompra: number,
    @Param('idProducto') idProducto: number,
  ) {
    return this.detalleCarroComprasService.incrementarProductoEnCarro(
      idCarroCompra,
      idProducto
    );
  }
  //#endregion

//#region Disminuir Cantidad de Producto ya Agregado al Carro de Compras
@ApiTags('Carro de Compras')
@ApiOperation({
  summary:
    'HU 5.1: Carrito de Compras - Disminuir Cantidad de Producto ya Agregado al Carro de Compras',
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
@Patch('disminuirProducto/:idCarroCompra/:idProducto')
disminuirProductoEnCarro(
  @Param('idCarroCompra') idCarroCompra: number,
  @Param('idProducto') idProducto: number,
) {
  return this.detalleCarroComprasService.disminuirProductoEnCarro(
    +idCarroCompra,
    +idProducto
  );
}
//#endregion

  //#region Eliminar Producto del Carro de Compras
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
  quitarProductoDelCarro(
    @Param('idCarroCompra') idCarroCompra: number,
    @Param('idProducto') idProducto: number,
  ) {
    return this.detalleCarroComprasService.quitarProductoDelCarro(
      idCarroCompra,
      idProducto,
    );
  }
  //#endregion
}
