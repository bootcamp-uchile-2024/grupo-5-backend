import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateCarrocompraDto } from './dto/update-carro-compra.dto';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCarroCompraDto } from './dto/create-carro-compra.dto';
import { CarroCompraService } from './carro-compra.service';

@ApiTags('Carro de Compras')
@Controller('carrocompra')
export class CarroCompraController {
  constructor(private readonly carroComprasService: CarroCompraService) {}

  //#region Obtener Carro de Compras por ID de Usuario
  @ApiOperation({
    summary:
      'HU 5.1: Carrito de Compras - Obtener Carrito de Compras por ID de Usuario',
    description:
      '<strong>HU 5.1 - Carrito de Compras:<br></strong> Como "Pet lover" quiero un carrito de compra que permita añadir y editar varios productos, para gestionar mis compras con facilidad.',
  })
  @ApiResponse({
    status: 200,
    description: 'Carro de compras encontrado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Carro de compras no encontrado.',
  })
  @ApiParam({
    name: 'id_usuario',
    description: 'Id del usuario',
    required: true,
    example: 1,
  })
  @Get(':id_usuario')
  getCarroCompraByIdUsuario(@Param('id_usuario') id_usuario: string) {
    return this.carroComprasService.getCarroCompraByIdUsuario(+id_usuario);
  }
  //#endregion

  //#region Actualizar Carro de Compras
  // @ApiOperation({
  //   summary: 'HU 5.1: Carrito de Compras - Actualizar Carrito de Compras',
  //   description:
  //     '<strong>HU 5.1 - Carrito de Compras:<br></strong> Como "Pet lover" quiero un carrito de compra que permita añadir y editar varios productos, para gestionar mis compras con facilidad.',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Carro de compras actualizado con éxito.',
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'Carro de compras no encontrado.',
  // })
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCarrocompraDto: UpdateCarrocompraDto,
  // ) {
  //   return this.carroComprasService.update(+id, updateCarrocompraDto);
  // }
  //#endregion

  //#region Eliminar Carro de Compras
  @ApiOperation({
    summary: 'HU 5.1: Carrito de Compras - Eliminar Carrito de Compras',
    description:
      '<strong>HU 5.1 - Carrito de Compras:<br></strong> Como "Pet lover" quiero un carrito de compra que permita añadir y editar varios productos, para gestionar mis compras con facilidad.',
  })
  @ApiResponse({
    status: 200,
    description: 'Carro de compras eliminado con éxito.',
  })
  @ApiResponse({
    status: 404,
    description: 'Carro de compras no encontrado.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carroComprasService.remove(+id);
  }
  //#endregion
}
